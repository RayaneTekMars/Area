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

function SignupAction(navigation) {
  // TODO : Rediriger plus tard vers la signinPage et non la homePage.
  navigation.navigate("homePage");
  // TODO : Requête vers l'API pour la création du compte.
  alert("Félicitations, votre compte a été créé ! 🎉");
}

export default function SignupPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPassword] = useState("");

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
          <MaterialCommunityIcons name="account" size={24} color="#ccc" />
          <TextInput
            style={signupComponents.componentField}
            placeholder="Nom d'utilisateur"
            onChangeText={(userInput) => setUsername(userInput)}
            value={username}
          />
        </View>
        <View style={signupContainers.fieldContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#ccc" />
          <TextInput
            style={signupComponents.componentField}
            placeholder="Adresse E-mail"
            onChangeText={(userInput) => setEmail(userInput)}
            keyboardType="email-address"
            value={email}
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
        <View style={signupContainers.fieldContainer}>
          <MaterialCommunityIcons name="key" size={24} color="#ccc" />
          <TextInput
            style={signupComponents.componentField}
            placeholder="Confirmer mot de passe"
            onChangeText={(userInput) => setConfirmPassword(userInput)}
            value={confirmPasswordValue}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={signupContainers.buttonContainer}>
        <TouchableOpacity
          style={signupComponents.componentButton}
          onPress={() => SignupAction(navigation)}
        >
          <Text style={signupTexts.textButton}>Sign Up</Text>
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
