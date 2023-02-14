// ProfilePage.js - Libraries imports.

import { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// ProfilePage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext, resetStorageData } from "../tools/Utils";

// ProfilePage.js - Function.

export default function ProfilePage({ navigation }) {
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
        <Text style={Style.appTexts.textTitle}>Parameters ⚙️</Text>
        <Text style={Style.appTexts.textSubTitle}>Connect your apps here</Text>
      </View>

      <View style={Style.appContainers.cardContainer}>
        <TouchableOpacity
          style={Style.appComponents.componentBanner}
          onPress={() => alert("Twitter button !")}
        >
          <Image source={require("../../assets/images/twitter_logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentBanner}
          onPress={() => alert("Github button !")}
        >
          <Image source={require("../../assets/images/github_logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentBanner}
          onPress={() => alert("Discord button !")}
        >
          <Image source={require("../../assets/images/discord_logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentBanner}
          onPress={() => alert("Spotify button !")}
        >
          <Image source={require("../../assets/images/spotify_logo.png")} />
        </TouchableOpacity>
      </View>

      <View style={Style.appButtonContainers.buttonContainer35}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={async () => {
            await resetStorageData("name", "");
            await resetStorageData("token", "");
            navigation.navigate("LoginStack", { screen: "Home" });
          }}
        >
          <Text style={Style.appTexts.textButton}>Disconnect</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
