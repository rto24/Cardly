import React, { useEffect, useState } from "react";
import { Servers } from "../types/types";
import { View, Text, FlatList } from "react-native";
import { getServers } from "../services/serversService";
import ServerCard from "../components/ServerCard";

const ViewServersScreen = ({ navigation }: any) => {
  const [ servers, setServers ] = useState<Servers[]>([]);

  useEffect(() => {
    const loadServers = async () => {
      const servers = await getServers();
      console.log(servers)
      setServers(servers);
    }
    loadServers();
  }, []);

  return (
    <View>
      <FlatList 
        data={servers}
        renderItem={({ item }) => (
          <ServerCard 
            id={item.id}
            name={item.name}
            owner={item.owner}
            picture={item.picture}
            members={item.members}
            tags={item.tags}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default ViewServersScreen;