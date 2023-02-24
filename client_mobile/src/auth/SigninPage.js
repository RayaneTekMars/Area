// SigninPage.js - Libraries imports.

import { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// SigninPage.js - Tools imports.

import * as Style from "../tools/Style";
import { SigninQuery } from "../tools/Query";
import { FontContext } from "../tools/Utils";
import { Logos, Shapes } from "../tools/Image";

// SigninPage.js - Core function.

export default function SigninPage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <View style={Style.appFormContainers.formContainer20}>
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
      </View>

      <View style={Style.appButtonContainers.buttonContainer40}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => SigninQuery(navigation, email, password)}
        >
          <Text style={Style.appTexts.textButton}>Sign In</Text>
        </TouchableOpacity>

        <Text style={Style.appTexts.textBasic20}>or</Text>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() =>
            navigation.navigate("LoginStack", { screen: "Google" })
          }
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
        <Image source={Shapes.ShapeLeft} />
      </View>
    </View>
  );
}
