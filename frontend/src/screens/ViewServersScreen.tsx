import React, { useState } from "react";
import { Servers } from "../types/types";
import { View } from "react-native";

const ViewServersScreen = ({ navigation }: any) => {
  const [ servers, setServers ] = useState<Servers[]>([]);

  return (
    <View>
      Join a Server
    </View>
  )
}

export default ViewServersScreen;