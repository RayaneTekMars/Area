import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

const shape = StyleSheet.create({
  bottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0
  }
});

const logo = StyleSheet.create({
  logoPosition: {
    position: "absolute",
    top: "15%"
  },
});

const text = StyleSheet.create({
  textTitle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    fontSize: 25,
    marginHorizontal: 25
  },
  textContainer: {
    alignItems: "center"
  }
});

const global = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222"
  }
});

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={global.container}>
      <View style={shape.topRight}>
        <Image source={require("./assets/images/amm_square_2.png")} />
      </View>
      <View style={logo.logoPosition}>
        <Image source={require("./assets/images/amm_logo.png")} />
      </View>
      <View style={text.textContainer}>
        <Text style={text.textTitle}>Votre nouveau compagnon au quotidien 🥰</Text>
      </View>
      <View style={shape.bottomLeft}>
        <Image source={require("./assets/images/amm_square_1.png")} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
