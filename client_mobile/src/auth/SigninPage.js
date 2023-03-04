// SigninPage.js - Libraries imports.

import { useState, useContext } from "react";
import * as AuthSession from "expo-auth-session";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// SigninPage.js - Tools imports.

import * as Style from "../tools/Style";
import { Logos, Shapes } from "../tools/Image";
import { FontContext, GoogleData } from "../tools/Utils";
import { SigninQuery, SigninGoogleQuery } from "../tools/Query";

// SigninPage.js - Core function.

export default function SigninPage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignin = async (navigation) => {
    const config = {
      clientId: GoogleData.clientId,
      scopes: GoogleData.scopes,
      redirectUri: GoogleData.redirectUri,
    };

    const link =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?scope=${encodeURIComponent(config.scopes.join(" "))}` +
      `&access_type=offline` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(config.redirectUri)}` +
      `&client_id=${config.clientId}`;

    const { type, params } = await AuthSession.startAsync({ authUrl: link });

    if (type === "success") {
      const { code } = params;

      try {
        await SigninGoogleQuery(navigation, code);
      } catch (error) {
        console.error("[LOG] - Error while connecting Google account: ", error);
      }
    }
  };

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
          style={Style.appButtonComponents.componentButton}
          onPress={async () => await SigninQuery(navigation, email, password)}
        >
          <Text style={Style.appTexts.textButton}>Sign In</Text>
        </TouchableOpacity>

        <Text style={Style.appTexts.textBasic20}>or</Text>

        <TouchableOpacity
          style={Style.appButtonComponents.componentButton}
          onPress={async () => await handleGoogleSignin(navigation)}
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
