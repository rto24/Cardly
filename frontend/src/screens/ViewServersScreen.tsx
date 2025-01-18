import React, { useState } from "react";
import { Servers } from "../types/types";
import { View, Text } from "react-native";

const ViewServersScreen = ({ navigation }: any) => {
  const [ servers, setServers ] = useState<Servers[]>([]);

  return (
    <View>
      <Text>Join a Server</Text>
    </View>
  )
}

export default ViewServersScreen;