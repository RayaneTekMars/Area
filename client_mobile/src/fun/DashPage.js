// DashPage.js - Libraries imports.

import { useFonts } from "expo-font";
import { Text, View, Image, TouchableOpacity } from "react-native";

// DashPage.js - Ressources import.

import * as Style from "../res/Style";

// DashPage.js - Function.

export default function DashPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={require("../../assets/images/amm_shape_right.png")} />
      </View>

      <View style={Style.appContainers.titleContainer}>
        <Text style={Style.appTexts.textTitle}>Hello Neex 💫</Text>
        <Text style={Style.appTexts.textSubTitle}>Nice to see you again</Text>
      </View>

      <View style={Style.appContainers.cardContainer}></View>

      <View style={Style.appButtonContainers.buttonContainer35}>
        <Text style={Style.appTexts.textBasic15}>
          Start connecting your apps now ! 💡
        </Text>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={Style.appTexts.textButton}>Parameters</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
