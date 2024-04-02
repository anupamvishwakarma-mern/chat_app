import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth'
import { Login } from "../components/Auth/Login";
import { Details } from "../components/Auth/Details";
import { Dashboard } from "../components/Dashboard/Dashboard"
import { ChatScreen } from "../components/chat/ChatScreen";

const Stack = createStackNavigator()

export const AppNavigation = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state chages
  const onAuthStateChanged = (result) => {
    setUser(result)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, [])

  if (initializing) return null

  return (
    <Stack.Navigator initialRouteName={user ? "Dashboard" : "Login"}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Details}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen" 
        component={ChatScreen}
      />
    </Stack.Navigator>
  )
}