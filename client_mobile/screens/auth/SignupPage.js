// SignupPage.js - Libraries imports.

import axios from "axios";
import { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// SignupPage.js - Ressources imports.

import * as Style from "../res/Style";

// SignupPage.js - Function.

async function SignupAction(navigation, username, email, password) {
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

export default function SignupPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPassword] = useState("");

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={require("../../assets/images/amm_shape_right.png")} />
      </View>

      <View style={Style.appContainers.logoContainer}>
        <Image
          source={require("../../assets/images/amm_logo_full.png")}
          style={Style.appComponents.componentLogo}
        />
      </View>

      <View style={Style.appFormContainers.formContainer30}>
        <View style={Style.appContainers.fieldContainer}>
          <MaterialCommunityIcons name="account" size={24} color="#ccc" />
          <TextInput
            style={Style.appComponents.componentField}
            placeholder="Nom d'utilisateur"
            onChangeText={(userInput) => setUsername(userInput)}
            value={username}
          />
        </View>

        <View style={Style.appContainers.fieldContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#ccc" />
          <TextInput
            style={Style.appComponents.componentField}
            placeholder="Adresse E-mail"
            onChangeText={(userInput) => setEmail(userInput)}
            keyboardType="email-address"
            value={email}
            autoCorrect={false}
            autoComplete={false}
            autoCapitalize={false}
          />
        </View>

        <View style={Style.appContainers.fieldContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#ccc" />
          <TextInput
            style={Style.appComponents.componentField}
            placeholder="Mot de passe"
            onChangeText={(userInput) => setPassword(userInput)}
            value={password}
            secureTextEntry={true}
          />
        </View>

        <View style={Style.appContainers.fieldContainer}>
          <MaterialCommunityIcons name="key" size={24} color="#ccc" />
          <TextInput
            style={Style.appComponents.componentField}
            placeholder="Confirmer mot de passe"
            onChangeText={(userInput) => setConfirmPassword(userInput)}
            value={confirmPasswordValue}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View style={Style.appButtonContainers.buttonContainer30}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => SignupAction(navigation, username, email, password)}
        >
          <Text style={Style.appTexts.textButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
