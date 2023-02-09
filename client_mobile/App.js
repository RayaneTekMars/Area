// App.js - Libraries imports.

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// App.js - Screens imports.

import HomePage from "./src/HomePage";
import DashPage from "./src/user/DashPage";
import SignupPage from "./src/auth/SignupPage";
import SigninPage from "./src/auth/SigninPage";
import ProfilePage from "./src/user/ProfilePage";
import GooglePage from "./src/external/GooglePage";

// App.js - Tool import.

import { LoadFonts } from "./src/tools/Utils";

// App.js - Stack variables.

const Sub = createNativeStackNavigator();
const Core = createNativeStackNavigator();

// App.js - Stack functions.

function LoginStack() {
  return (
    <Sub.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Sub.Screen name="Home" component={HomePage} />
      <Sub.Screen name="SignUp" component={SignupPage} />
      <Sub.Screen name="SignIn" component={SigninPage} />
      <Sub.Screen name="Google" component={GooglePage} />
    </Sub.Navigator>
  );
}

function UserStack() {
  return (
    <Sub.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Sub.Screen name="Dash" component={DashPage} />
      <Sub.Screen name="Profile" component={ProfilePage} />
    </Sub.Navigator>
  );
}

// App.js - Core function.

export default function App() {
  return (
    <LoadFonts>
      <NavigationContainer>
        <Core.Navigator screenOptions={{ gestureEnabled: false }}>
          <Core.Screen
            name="LoginStack"
            component={LoginStack}
            options={{ headerShown: false }}
          />
          <Core.Screen
            name="UserStack"
            component={UserStack}
            options={{ headerShown: false }}
          />
        </Core.Navigator>
      </NavigationContainer>
    </LoadFonts>
  );
}
