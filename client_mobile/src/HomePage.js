// HomePage.js - Libraries imports.

import { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// HomePage.js - Tools imports.

import * as Style from "./tools/Style";
import { FontContext } from "./tools/Utils";

// HomePage.js - Core function.

export default function HomePage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

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
          onPress={() =>
            navigation.navigate("LoginStack", { screen: "SignUp" })
          }
        >
          <Text style={Style.appTexts.textButton}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() =>
            navigation.navigate("LoginStack", { screen: "SignIn" })
          }
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
