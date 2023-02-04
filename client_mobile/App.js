// App.js - Libraries imports.

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// App.js - Screens imports.

import HomePage from "./src/HomePage";
import DashPage from "./src/user/DashPage";
import SignupPage from "./src/auth/SignupPage";
import SigninPage from "./src/auth/SigninPage";
import ProfilePage from "./src/user/ProfilePage";

// App.js - Tool import.

import LoadFonts from "./src/tools/Utils";

// App.js - Function.

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LoadFonts>
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
          <Stack.Screen name="Profile" component={ProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoadFonts>
  );
}
