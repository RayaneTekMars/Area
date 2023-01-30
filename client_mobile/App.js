// App.js - Libraries imports.

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// App.js - Screens imports.

import HomePage from "./src/HomePage";
import DashPage from "./src/fun/DashPage";
import SignupPage from "./src/auth/SignupPage";
import SigninPage from "./src/auth/SigninPage";

// App.js - Function.

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="SignUp" component={SignupPage} />
        <Stack.Screen name="SignIn" component={SigninPage} />
        <Stack.Screen name="Dash" component={DashPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
