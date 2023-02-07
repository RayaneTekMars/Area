// App.js - Libraries imports.

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// App.js - Screens imports.

import HomePage from "./src/HomePage";
import DashPage from "./src/user/DashPage";
import SignupPage from "./src/auth/SignupPage";
import SigninPage from "./src/auth/SigninPage";
import ProfilePage from "./src/user/ProfilePage";

// App.js - Tool import.

import { LoadFonts } from "./src/tools/Utils";

// App.js - Stack variables.

const Login = createNativeStackNavigator();
const User = createNativeStackNavigator();
const Core = createNativeStackNavigator();

// App.js - Stack functions.

function LoginStack() {
  return (
    <Login.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Login.Screen name="Home" component={HomePage} />
      <Login.Screen name="SignUp" component={SignupPage} />
      <Login.Screen name="SignIn" component={SigninPage} />
    </Login.Navigator>
  );
}


function UserStack() {
  return (
    <User.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <User.Screen name="Dash" component={DashPage} />
      <User.Screen name="Profile" component={ProfilePage} />
    </User.Navigator>
  );
}

// App.js - Core function.

export default function App() {
  return (
    <LoadFonts>
      <NavigationContainer>
        <Core.Navigator>
          <Core.Screen
            name="LoginStack"
            component={LoginStack}
            options={{ headerShown: false, gestureEnabled: false }}
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
