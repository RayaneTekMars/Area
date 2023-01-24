import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./screens/HomePage";
import SignupPage from "./screens/SignupPage";

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
        <Stack.Screen name="signupPage" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
