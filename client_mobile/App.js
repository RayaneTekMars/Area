import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const shape = StyleSheet.create({
  bottomLeft: {
    position: "absolute",
    bottom: "0%",
    left: "0%",
  },
  topRight: {
    position: "absolute",
    top: "0%",
    right: "0%",
  },
});

const logo = StyleSheet.create({
  logoPosition: {
    position: "absolute",
    top: "14%",
  },
  logoSize: {
    width: 275,
    height: 200,
    resizeMode: "contain",
  },
});

const button = StyleSheet.create({
  buttonSignupPosition: {
    position: "absolute",
    bottom: "20%",
  },
  buttonSigninPosition: {
    position: "absolute",
    bottom: "10%",
    borderRadius: 20,
  },
  buttonTitleText: {
    fontSize: 15,
    color: "#222222",
    fontFamily: "Inter-ExtraBold",
  },
});

const text = StyleSheet.create({
  textTitle: {
    fontSize: 25,
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    marginHorizontal: "6%",
  },
  textContainer: {
    position: "absolute",
    top: "45%",
  },
});

const global = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
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
      <View style={shape.topRight}>
        <Image source={require("./assets/images/amm_square_2.png")} />
      </View>
      <View style={logo.logoPosition}>
        <Image
          source={require("./assets/images/amm_logo_full.png")}
          style={logo.logoSize}
        />
      </View>
      <View style={text.textContainer}>
        <Text style={text.textTitle}>
          Votre nouveau compagnon, au quotidien 📋
        </Text>
      </View>
      {/* <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 10,
            alignItems: "center",
            width: "30%",
          }}
          onPress={() => alert("🎉🎉🎉")}
        >
          <Text style={{ color: "#222222", fontFamily: "Inter-ExtraBold" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View> */}
      <View>
        <TouchableOpacity
          style={{
            // position: "absolute",
            // bottom: "20%",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 10,
            alignItems: "center",
            width: "40%",
            marginTop: 500,
          }}
          onPress={() => alert("🎉🎉🎉")}
        >
          <Text style={button.buttonTitleText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // position: "absolute",
            // bottom: "10%",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 10,
            alignItems: "center",
            width: "40%",
            marginTop: 50,
          }}
          onPress={() => alert("🎉🎉🎉")}
        >
          <Text style={button.buttonTitleText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={shape.bottomLeft}>
        <Image source={require("./assets/images/amm_square_1.png")} />
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}
