// SignupPage.js - Libraries imports.

import { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// SignupPage.js - Ressources imports.

import * as Query from "../res/Query";
import * as Style from "../res/Style";

// SignupPage.js - Functions.

function ComparePassword(password, confirm) {
  if (password !== confirm) {
    alert("Passwords do not match.");
    return false;
  }
  return true;
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
  const [confirm, setConfirmPassword] = useState("");

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
            placeholder="Username"
            onChangeText={(userInput) => setUsername(userInput)}
            value={username}
          />
        </View>

        <View style={Style.appContainers.fieldContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#ccc" />
          <TextInput
            style={Style.appComponents.componentField}
            placeholder="E-mail address"
            onChangeText={(userInput) => setEmail(userInput)}
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
            placeholder="Password"
            onChangeText={(userInput) => setPassword(userInput)}
            value={password}
            secureTextEntry={true}
          />
        </View>

        <View style={Style.appContainers.fieldContainer}>
          <MaterialCommunityIcons name="key" size={24} color="#ccc" />
          <TextInput
            style={Style.appComponents.componentField}
            placeholder="Confirm password"
            onChangeText={(userInput) => setConfirmPassword(userInput)}
            value={confirm}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View style={Style.appButtonContainers.buttonContainer30}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => {
            if (ComparePassword(password, confirm)) {
              Query.SignupQuery(navigation, username, email, password);
            }
          }}
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
