import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../services/authService";

const RegisterScreen = ({ navigation }: any) => {
  const [ email, setEmail ] = useState<string>("");
  const [ username, setUsername ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(email, username, password);
      setErrorMessage(null)
    } catch (error: any) {
      setErrorMessage(error);
    }
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
      {errorMessage &&
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto"
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default RegisterScreen;