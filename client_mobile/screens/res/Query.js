// Query.js - Library import.

import axios from "axios";

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
      navigation.navigate("Dash");
      alert("Welcome to your account !");
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
      navigation.navigate("Dash");
      alert("Congratulations, your account has been created ! 🎉");
    } else {
      // TODO: Mettre en rouge les champs qui posent problème.
      alert("Error while creating your account.");
    }
  } catch (error) {
    alert("Error while creating your account.");
  }
}
