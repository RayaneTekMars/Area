// Query.js - Libraries imports.

import axios from "axios";
import { AsyncStorage } from "react-native";

// Query.js - Functions.

export async function SigninQuery(navigation, email, password) {
  try {
    const data = {
      email: email,
      password: password,
      authTokenName: "",
    };

    const response = await axios.post(
      "http://10.20.85.249:8080/auth/login",
      data
    );

    if (response.status === 200) {
      await AsyncStorage.setItem("token", response.data.data.bearerToken);
      await AsyncStorage.setItem("name", response.data.data.account.username);
      navigation.navigate("Dash");
    } else {
      // TODO: Mettre en rouge les champs qui posent problème.
      alert("Error while connecting to your account.");
    }
  } catch (error) {
    alert("Error while connecting to your account.");
  }
}

export async function SignupQuery(navigation, username, email, password) {
  try {
    const data = {
      email: email,
      username: username,
      password: password,
      authTokenName: "",
    };

    const response = await axios.post(
      "http://10.20.85.249:8080/auth/signup",
      data
    );

    if (response.status === 200) {
      await AsyncStorage.setItem("token", response.data.data.bearerToken);
      await AsyncStorage.setItem("name", response.data.data.account.username);
      navigation.navigate("Dash");
    } else {
      // TODO: Mettre en rouge les champs qui posent problème.
      alert("Error while creating your account.");
    }
  } catch (error) {
    alert("Error while creating your account.");
  }
}

export async function SigninGoogleQuery() {}
