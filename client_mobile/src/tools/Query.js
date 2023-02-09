// Query.js - Libraries imports.

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Query.js - Functions.

export async function SigninQuery(navigation, email, password) {
  try {
    const data = {
      email: email,
      password: password,
      authTokenName: "",
    };

    const response = await axios.post(
      "https://api.automateme.fr/auth/login",
      data
    );

    if (response.status === 200) {
      await AsyncStorage.setItem("token", response.data.data.bearerToken);
      await AsyncStorage.setItem("name", response.data.data.account.username);
      navigation.navigate("UserStack", { screen: "Dash" });
    } else {
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
      "https://api.automateme.fr/auth/signup",
      data
    );

    if (response.status === 200) {
      await AsyncStorage.setItem("token", response.data.data.bearerToken);
      await AsyncStorage.setItem("name", response.data.data.account.username);
      navigation.navigate("UserStack", { screen: "Dash" });
    } else {
      alert("Error while creating your account.");
    }
  } catch (error) {
    alert("Error while creating your account.");
  }
}

export async function SigninGoogleQuery() {}

export async function AddScenarioQuery() {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const data = {
      name: "NewPostForNewFollower",
      trigger: {
        name: "NewFollower",
        serviceName: "Twitter",
        params: [],
      },
      reaction: {
        name: "PostTweet",
        serviceName: "Twitter",
        params: [
          {
            name: "text",
            value: "Hello World",
            required: true,
          },
        ],
      },
    };

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://api.automateme.fr/scenarios/create",
      data,
      config
    );

    if (response.status === 200) {
      alert("Congratulations, scenario created.");
    } else {
      alert("Error while creating your scenario.");
    }
  } catch (error) {
    alert("Error while creating your scenario.");
  }
}
