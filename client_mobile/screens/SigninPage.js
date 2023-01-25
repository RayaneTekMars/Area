import axios from "axios";
import { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

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
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={signupContainers.globalContainer}>
      <View style={signupShapes.shapeRight}>
        <Image source={require("../assets/images/amm_shape_right.png")} />
      </View>
      <View style={signupContainers.logoContainer}>
        <Image
          source={require("../assets/images/amm_logo_full.png")}
          style={signupComponents.componentLogo}
        />
      </View>
      <View style={signupContainers.formContainer}>
        <View style={signupContainers.fieldContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#ccc" />
          <TextInput
            style={signupComponents.componentField}
            placeholder="Adresse E-mail"
            onChangeText={(userInput) => setEmail(userInput)}
            keyboardType="email-address"
            value={email}
            autoCorrect={false}
            autoComplete={false}
            autoCapitalize={false}
          />
        </View>
        <View style={signupContainers.fieldContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#ccc" />
          <TextInput
            style={signupComponents.componentField}
            placeholder="Mot de passe"
            onChangeText={(userInput) => setPassword(userInput)}
            value={password}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={signupContainers.buttonContainer}>
        <TouchableOpacity
          style={signupComponents.componentButton}
          onPress={() => SigninAction(navigation, email, password)}
        >
          <Text style={signupTexts.textButton}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={signupShapes.shapeLeft}>
        <Image source={require("../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}

const signupShapes = StyleSheet.create({
  shapeLeft: {
    position: "absolute",
    bottom: "0%",
    left: "0%",
    zIndex: -1,
  },
  shapeRight: {
    position: "absolute",
    top: "0%",
    right: "0%",
    zIndex: -1,
  },
});

const signupComponents = StyleSheet.create({
  componentLogo: {
    width: 275,
    height: 200,
    resizeMode: "contain",
  },
  componentButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  componentField: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "60%",
  },
});

const signupTexts = StyleSheet.create({
  textButton: {
    color: "#222222",
    fontSize: "20rem",
    fontFamily: "Inter-ExtraBold",
  },
});

const signupContainers = StyleSheet.create({
  globalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
  },
});
