// SignupPage.js - Libraries imports.

import { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// SignupPage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext } from "../tools/Utils";
import { SignupQuery } from "../tools/Query";
import { Logos, Shapes } from "../tools/Image";

// SignupPage.js - Additional function.

function ComparePassword(password, confirm) {
  if (password !== confirm) {
    alert("Passwords do not match.");
    return false;
  }
  return true;
}

// SignupPage.js - Core function.

export default function SignupPage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={Shapes.ShapeRight} />
      </View>

      <View style={Style.appContainers.logoContainer}>
        <Image
          source={Logos.AmmLogo}
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
            autoCorrect={false}
            autoComplete={false}
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
            onChangeText={(userInput) => setConfirm(userInput)}
            value={confirm}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View style={Style.appButtonContainers.buttonContainer30}>
        <TouchableOpacity
          style={Style.appButtonComponents.componentButton}
          onPress={async () => {
            if (ComparePassword(password, confirm)) {
              await SignupQuery(navigation, username, email, password);
            }
          }}
        >
          <Text style={Style.appTexts.textButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={Shapes.ShapeLeft} />
      </View>
    </View>
  );
}
