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
        console.error(error);
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

export const resetStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};
