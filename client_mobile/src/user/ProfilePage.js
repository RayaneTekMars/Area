// ProfilePage.js - Libraries imports.

import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

// ProfilePage.js - Tools imports.

import * as Style from "../tools/Style";
import { Logos, Shapes } from "../tools/Image";
import { DeleteServiceAuthLinkQuery } from "../tools/Query";
import { FontContext, resetStorageData } from "../tools/Utils";

// ProfilePage.js - Additional function.

const serviceDictionary = {
  github: Logos.GithubLogo,
  twitch: Logos.TwitchLogo,
  discord: Logos.DiscordLogo,
  spotify: Logos.SpotifyLogo,
  twitter: Logos.TwitterLogo,
};

function CustomCardService({ navigation, service }) {
  const serviceLogo = serviceDictionary[service];

  return (
    <View style={Style.appComponents.componentCardService}>
      <Image source={serviceLogo} />

      <TouchableOpacity
        style={Style.appComponents.componentPtdrButton}
        onPress={() =>
          navigation.navigate("UserStack", {
            screen: "Auth",
            params: { service },
          })
        }
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={Style.appTexts.textPtdr}>Link</Text>
          <MaterialCommunityIcons
            name="check"
            size={24}
            color="#77DD77"
            style={{ paddingLeft: 5 }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={Style.appComponents.componentPtdrButton}
        onPress={() => DeleteServiceAuthLinkQuery(service)}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={Style.appTexts.textPtdrD}>Revoke</Text>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color="#FF6666"
            style={{ paddingLeft: 5 }}
          />
        </View>
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
          <CustomCardService navigation={navigation} service={"twitter"} />
          <CustomCardService navigation={navigation} service={"discord"} />
          <CustomCardService navigation={navigation} service={"github"} />
          <CustomCardService navigation={navigation} service={"spotify"} />
          <CustomCardService navigation={navigation} service={"twitch"} />
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
