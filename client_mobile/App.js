// App.js - Libraries imports.
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// App.js - Screens imports.
import HomePage from "./screens/HomePage";
import SignUpPage from "./screens/auth/SignupPage";
import SignInPage from "./screens/auth/SigninPage";

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
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
