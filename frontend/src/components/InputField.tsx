import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { InputFieldProps } from "../types/types";

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  className,
}) => (
  <View style={styles.container}>
    <TextInput 
      className={className}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  }
})

export default InputField;