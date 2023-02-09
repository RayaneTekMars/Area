// GooglePage.js - Libraries imports.

import { useContext } from "react";
import { WebView } from "react-native-webview";
import { View, Text, TouchableOpacity } from "react-native";

// GooglePage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext } from "../tools/Utils";

// GooglePage.js - Core function.

export default function GooglePage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={Style.appContainers.fullContainer}>
      <View style={Style.appContainers.topBannerContainer}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={Style.appTexts.textButton}>Close</Text>
        </TouchableOpacity>
      </View>

      <WebView source={{ uri: "https://google.com/" }} />
    </View>
  );
}
