// ProfilePage.js - Libraries imports.

import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

// ProfilePage.js - Tools imports.

import * as Style from "../tools/Style";
import { Logos, Shapes } from "../tools/Image";
import { FontContext, resetStorageData } from "../tools/Utils";

// ProfilePage.js - Additional function.

const logoDictionary = {
  Twitter: Logos.TwitterLogo,
  Discord: Logos.DiscordLogo,
  Github: Logos.GithubLogo,
  Spotify: Logos.SpotifyLogo,
};

function CustomCardService({ logo }) {
  const logoImage = logoDictionary[logo];

  return (
    <View style={Style.appComponents.componentCardService}>
      <Image source={logoImage} />

      <TouchableOpacity
        style={Style.appComponents.componentDeleteButton}
        onPress={() => alert("Delete button !")}
      >
        <MaterialCommunityIcons name="delete" size={24} color="#FF6666" />
      </TouchableOpacity>
    </View>
  );
}

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

      <View style={Style.appTitleContainers.titleContainer15}>
        <Text style={Style.appTexts.textTitle}>Parameters ⚙️</Text>
        <Text style={Style.appTexts.textSubTitle}>Connect your apps here</Text>
      </View>

      <View style={Style.appScrollViewContainers.scrollViewContainer50}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <CustomCardService logo={"Twitter"} />
          <CustomCardService logo={"Discord"} />
          <CustomCardService logo={"Github"} />
          <CustomCardService logo={"Spotify"} />
        </ScrollView>
      </View>

      <View style={Style.appButtonContainers.buttonContainer20}>
        <Text style={Style.appTexts.textBasic15}>Bye ! 👋</Text>

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
