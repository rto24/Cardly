import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ViewPostsScreen from "../screens/ViewPostScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ViewServersScreen from "../screens/ViewServersScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = ({ route }: any) => {
  const { screen } = route.params || {};
  
  return (
    <Tab.Navigator 
      initialRouteName={screen || "View Posts"}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60, 
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93', 
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="View Posts" component={ViewPostsScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Servers" component={ViewServersScreen} />
    </Tab.Navigator>
  )
}

const AppNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="View Posts"
          component={ViewPostsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Create"
          component={CreatePostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Servers"
          component={ViewServersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main"
          component={TabNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNav;