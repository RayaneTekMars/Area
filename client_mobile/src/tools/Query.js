// Query.js - Libraries imports.

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Query.js - Login queries.

export async function SigninQuery(navigation, email, password) {
  try {
    const data = {
      email: email,
      password: password,
      authTokenName: "",
    };

    const response = await axios.post(
      "http://localhost:8080/auth/login",
      data
    );

    if (response.status === 200) {
      await AsyncStorage.setItem("id", response.data.data.account.id);
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
      "http://localhost:8080/auth/signup",
      data
    );

    if (response.status === 200) {
      await AsyncStorage.setItem("id", response.data.data.account.id);
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

// Query.js - Services queries.

export async function AddScenarioQuery(navigation) {
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
      "http://localhost:8080/scenarios/create",
      data,
      config
    );

    if (response.status === 200) {
      navigation.navigate("UserStack", { screen: "Dash" });
    } else {
      alert("Error while creating your scenario.");
    }
  } catch (error) {
    alert("Error while creating your scenario.");
  }
}

export async function GetScenariosQuery() {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      "http://localhost:8080/scenarios",
      config
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      alert("Error while fetching your scenarios.");
    }
  } catch (error) {
    alert("Error while fetching your scenarios.");
  }
}

export async function DeleteScenarioQuery(id) {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.delete(
      "http://localhost:8080/scenarios/delete/" + id,
      config
    );

    if (response.status === 200) {
      return null;
    } else {
      alert("Error while deleting your scenario.");
    }
  } catch (error) {
    alert("Error while deleting your scenario.");
  }
}
