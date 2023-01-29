// SigninPage.js - Libraries imports.

import axios from "axios";
import { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// SigninPage.js - Ressources imports.

import * as Style from "../res/Style";

// SigninPage.js - Function.

async function SigninAction(navigation, email, password) {
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

export default function SignupPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <View style={Style.appFormContainers.formContainer20}>
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
      </View>

      <View style={Style.appButtonContainers.buttonContainer40}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => SigninAction(navigation, email, password)}
        >
          <Text style={Style.appTexts.textButton}>Sign In</Text>
        </TouchableOpacity>

        <Text style={Style.appTexts.textBasic20}>or</Text>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => SigninAction(navigation, email, password)}
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="google"
              size={24}
              color="#ccc"
              style={{ paddingRight: 10 }}
            />
            <Text style={Style.appTexts.textButton}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
