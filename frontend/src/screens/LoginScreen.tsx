import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      const response = await loginUser(email, password);
      if (!response) {
        setErrorMessage("Email or password is invalid");
      } else {
        const { accessToken, refreshToken, userId } = response;

        await login(accessToken, refreshToken, userId);

        setErrorMessage(null);
        navigation.navigate("Main", { screen: "View Posts" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <InputField 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        title="Login"
        onPress={handleLogin}
      />
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text>
    {errorMessage && 
      <Text style={styles.errorText}>{errorMessage}</Text>
    }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center"
  },
  link: {
    color: "blue",
    textAlign: "center",
  }
});

export default LoginScreen