import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import Button from "./Button";
import InputField from "./InputField";
import { Servers } from "../types/types";

const ServerCard: React.FC<Servers> = ({
  id,
  name,
  owner,
  picture,
  members,
  tags
}) => {
  return (
    <View className="flex flex-row items-center bg-white rounded-lg p-4 m-2">
      <Image 
        source={{ uri: picture }}
        className="w-16 h-16 rounded-full"
      />
      <Text className="text-xl font-bold">{name}</Text>
      <View className="flex flex-row flex-wrap">
        {tags.map((tag, index) => (
          <Text key={index} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full mr-2 mt-1">
          {tag}
        </Text>
        ))}
      </View>
      <Text className="text-sm text-gray-600 mt-2">
        Owned by <Text className="font-semibold">{owner.username}</Text>
      </Text>
      <Button 
        title="Join"
        onPress={() => {
          console.log("This will trigger a join request to the owner of the server")
        }}
      />
    </View>
  )
}

export default ServerCard;