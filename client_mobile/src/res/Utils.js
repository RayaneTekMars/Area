// Utils.js - Library import.

import { AsyncStorage } from "react-native";

// Utils.js - Variable.

export const resetData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};
