import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import Button from "../components/Button";

const RegisterScreen = ({ navigation }: any) => {
  const [ email, setEmail ] = useState<string>("")
  const [ username, setUsername ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ confirmPassword, setConfirmPassword ] = useState<string>("")

  const handleSignUp = () => {
    //signup logic
  }

  return (
    <View style={styles.container}>
      <InputField 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField 
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <InputField 
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button
        title="Register"
        onPress={handleSignUp}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto"
  }
})

export default RegisterScreen;