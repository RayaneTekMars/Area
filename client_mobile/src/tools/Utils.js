// Utils.js - Libraries imports.

import * as Font from "expo-font";
import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Utils.js - Font variables.

export const FontContext = createContext(false);

export const LoadFonts = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
          "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
          "Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("[LOG] - Error while loading font: ", error);
      }
    };
    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={fontsLoaded}>
      {fontsLoaded ? children : null}
    </FontContext.Provider>
  );
};

// Utils.js - Storage variable.

export const ResetStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("[LOG] - Error while resetting data: ", error);
  }
};

// Utils.js - Google variable.

export const GoogleData = {
  clientId:
    "372680138588-itighfhngdv70clkqmshedgmlpf4rn89.apps.googleusercontent.com",
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
  ],
  redirectUri: "https://www.automateme.fr/oauth/google",
};

// Utils.js - Dropdown variables.

export const Services = ["Twitter", "Discord", "Spotify", "Github"];

export const Triggers = ["New Follower"];

export const Reactions = ["Post Tweet"];
