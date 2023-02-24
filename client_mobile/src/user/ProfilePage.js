// ProfilePage.js - Libraries imports.

import { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// ProfilePage.js - Tools imports.

import * as Style from "../tools/Style";
import { Logos, Shapes } from "../tools/Image";
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
        <Image source={Shapes.ShapeRight} />
      </View>

      <View style={Style.appTitleContainers.titleContainer30}>
        <Text style={Style.appTexts.textTitle}>Parameters ⚙️</Text>
        <Text style={Style.appTexts.textSubTitle}>Connect your apps here</Text>
      </View>

      <View style={Style.appContainers.cardContainer}>
        <TouchableOpacity
          style={Style.appComponents.componentBanner}
          onPress={() => alert("Twitter button !")}
        >
          <Image source={Logos.TwitterLogo} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentBanner}
          onPress={() => alert("Github button !")}
        >
          <Image source={Logos.GithubLogo} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentBanner}
          onPress={() => alert("Discord button !")}
        >
          <Image source={Logos.DiscordLogo} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentBanner}
          onPress={() => alert("Spotify button !")}
        >
          <Image source={Logos.SpotifyLogo} />
        </TouchableOpacity>
      </View>

      <View style={Style.appButtonContainers.buttonContainer35}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={async () => {
            await resetStorageData("id", "");
            await resetStorageData("name", "");
            await resetStorageData("token", "");
            navigation.navigate("LoginStack", { screen: "Home" });
          }}
        >
          <Text style={Style.appTexts.textButton}>Disconnect</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={Shapes.ShapeLeft} />
      </View>
    </View>
  );
}
