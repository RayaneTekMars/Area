import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./screens/HomePage";
import SignUpPage from "./screens/SignupPage";
import SignInPage from "./screens/SigninPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="homePage" component={HomePage} />
        <Stack.Screen name="signupPage" component={SignUpPage} />
        <Stack.Screen name="signinPage" component={SignInPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
