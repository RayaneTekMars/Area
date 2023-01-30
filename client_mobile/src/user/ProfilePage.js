// ProfilePage.js - Libraries imports.

import { useFonts } from "expo-font";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

// ProfilePage.js - Ressources import.

import * as Style from "../res/Style";

// ProfilePage.js - Function.

export default function ProfilePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
  });

  const resetData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Image source={require("../../assets/images/twitter_banner.png")} />
        </TouchableOpacity>
      </View>

      <View style={Style.appButtonContainers.buttonContainer35}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={async () => {
            await resetData("name", "");
            await resetData("token", "");
            navigation.navigate("Home");
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
