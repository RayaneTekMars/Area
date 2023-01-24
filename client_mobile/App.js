import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const homeShape = StyleSheet.create({
  bottomLeft: {
    position: "absolute",
    bottom: "0%",
    left: "0%",
    zIndex: -1,
  },
  topRight: {
    position: "absolute",
    top: "0%",
    right: "0%",
    zIndex: -1,
  },
});

const logo = StyleSheet.create({
  logoSize: {
    width: 275,
    height: 200,
    resizeMode: "contain",
  },
});

const button = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 20,
  },
  text: {
    fontSize: "20rem",
    color: "#222222",
    fontFamily: "Inter-ExtraBold",
  },
});

const text = StyleSheet.create({
  textTitle: {
    fontSize: "25rem",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    margin: "5%",
  },
});

const global = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "100%",
  },
  sloganContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "100%",
  },
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
      <View style={homeShape.topRight}>
        <Image source={require("./assets/images/amm_square_2.png")} />
      </View>

      <View style={global.logoContainer}>
        <Image
          source={require("./assets/images/amm_logo_full.png")}
          style={logo.logoSize}
        />
      </View>

      <View style={global.sloganContainer}>
        <Text style={text.textTitle}>
          Votre nouveau compagnon, au quotidien 📋
        </Text>
      </View>

      <View style={global.buttonContainer}>
        <TouchableOpacity style={button.button} onPress={() => alert("🎉🎉🎉")}>
          <Text style={button.text}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={button.button} onPress={() => alert("🎉🎉🎉")}>
          <Text style={button.text}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={homeShape.bottomLeft}>
        <Image source={require("./assets/images/amm_square_1.png")} />
      </View>

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}
