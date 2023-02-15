// ViewPage.js - Libraries imports.

import { useContext } from "react";
import { Text, View, Image } from "react-native";

// ViewPage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext } from "../tools/Utils";

// ViewPage.js - Core function.

export default function ViewPage() {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={require("../../assets/images/amm_shape_right.png")} />
      </View>

      <View style={Style.appContainers.titleContainer}>
        <Text style={Style.appTexts.textTitle}>Manage 👷</Text>
        <Text style={Style.appTexts.textSubTitle}>Your own scenarios</Text>
      </View>

      <View style={Style.appContainers.cardContainer}></View>

      <View style={Style.appButtonContainers.buttonContainer35}></View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
