import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const LoginScreen = () => {
  const { setUser } = useAuth();
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const handleLogin = async () => {
    const response = await loginUser(email, password);
    setUser(response.userId);
    //renavigate to something else like Home
  }

  return (
    <View>
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
    </View>
  )
}

export default LoginScreen