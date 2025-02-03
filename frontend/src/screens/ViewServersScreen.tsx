import React, { useEffect, useState } from "react";
import { Servers } from "../types/types";
import { View, Text } from "react-native";
import { getServers } from "../services/serversService";

const ViewServersScreen = ({ navigation }: any) => {
  const [ servers, setServers ] = useState<Servers[]>([]);

  useEffect(() => {
    const loadServers = async () => {
      const servers = await getServers();
      setServers(servers);
    }
    loadServers();
  }, []);

  return (
    <View>
      <Text>Join a Server</Text>
      {servers.map((server, index) => (
        <View key={index}>
          <Text>{server.name}</Text>
        </View>
      ))}
    </View>
  )
}

export default ViewServersScreen;