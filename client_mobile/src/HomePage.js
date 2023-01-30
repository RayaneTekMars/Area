// HomePage.js - Libraries imports.

import { useFonts } from "expo-font";
import { Text, View, Image, TouchableOpacity } from "react-native";

// HomePage.js - Ressources import.

import * as Style from "./res/Style";

// HomePage.js - Function.

export default function HomePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={require("../assets/images/amm_shape_right.png")} />
      </View>

      <View style={Style.appContainers.logoContainer}>
        <Image
          source={require("../assets/images/amm_logo_full.png")}
          style={Style.appComponents.componentLogo}
        />
      </View>

      <View style={Style.appContainers.sloganContainer}>
        <Text style={Style.appTexts.textSlogan}>
          Your new best companion, every day 🚀
        </Text>
      </View>

      <View style={Style.appButtonContainers.buttonContainer40}>
        <Text style={Style.appTexts.textBasic15}>
          New here ? Register now ! ✨
        </Text>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={Style.appTexts.textButton}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={Style.appTexts.textButton}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
