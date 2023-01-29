// Query.js - Library import.

import axios from "axios";

// Query.js - Functions.

export async function SigninAction(navigation, email, password) {
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
      navigation.navigate("homePage");
      // à rediriger vers le dashboard
      alert("Bienvenue sur votre compte !");
    } else {
      // mettre en rouge les champs qui posent problème
      navigation.navigate("homePage");
      alert("Erreur lors de la connexion à votre compte.");
    }
  } catch (error) {
    navigation.navigate("homePage");
    alert("Erreur lors de la connexion à votre compte.");
  }
}

export async function SignupAction(navigation, username, email, password) {
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
      // à rediriger vers le dashboard
      navigation.navigate("homePage");
      alert("Félicitations, votre compte a été créé ! 🎉");
    } else {
      // mettre en rouge les champs qui posent problème
      navigation.navigate("homePage");
      alert("Erreur lors de la création de votre compte.");
    }
  } catch (error) {
    navigation.navigate("homePage");
    alert("Erreur lors de la création de votre compte.");
  }
}
