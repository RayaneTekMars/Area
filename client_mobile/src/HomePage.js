// HomePage.js - Libraries imports.

import { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// HomePage.js - Tools imports.

import * as Style from "./tools/Style";
import { FontContext } from "./tools/Utils";
import { Logos, Shapes } from "./tools/Image";

// HomePage.js - Core function.

export default function HomePage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

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
          style={Style.appButtonComponents.componentButton}
          onPress={() =>
            navigation.navigate("LoginStack", { screen: "SignUp" })
          }
        >
          <Text style={Style.appTexts.textButton}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appButtonComponents.componentButton}
          onPress={() =>
            navigation.navigate("LoginStack", { screen: "SignIn" })
          }
        >
          <Text style={Style.appTexts.textButton}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={Shapes.ShapeLeft} />
      </View>
    </View>
  );
}
