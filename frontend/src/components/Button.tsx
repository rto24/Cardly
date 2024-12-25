import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "../types/types";

const Button: React.FC<ButtonProps> = ({ title, onPress, className }) => (
  <TouchableOpacity className={`bg-green-500 py-3 rounded-lg items-center my-2 ${className}`} onPress={onPress}>
    <Text className="text-white text-lg font-bold">{title}</Text>
  </TouchableOpacity>
);

export default Button;