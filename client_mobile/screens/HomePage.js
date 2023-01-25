import { useFonts } from "expo-font";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function HomePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={homeContainers.globalContainer}>
      <View style={homeShapes.shapeRight}>
        <Image source={require("../assets/images/amm_shape_right.png")} />
      </View>
      <View style={homeContainers.logoContainer}>
        <Image
          source={require("../assets/images/amm_logo_full.png")}
          style={homeComponents.componentLogo}
        />
      </View>
      <View style={homeContainers.sloganContainer}>
        <Text style={homeTexts.textSlogan}>
          Votre nouveau compagnon, au quotidien 🚀
        </Text>
      </View>
      <View style={homeContainers.buttonContainer}>
        <TouchableOpacity
          style={homeComponents.componentButton}
          onPress={() => navigation.navigate("signupPage")}
        >
          <Text style={homeTexts.textButton}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homeComponents.componentButton}
          onPress={() => navigation.navigate("signinPage")}
        >
          <Text style={homeTexts.textButton}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={homeShapes.shapeLeft}>
        <Image source={require("../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}

const homeShapes = StyleSheet.create({
  shapeLeft: {
    position: "absolute",
    bottom: "0%",
    left: "0%",
    zIndex: -1,
  },
  shapeRight: {
    position: "absolute",
    top: "0%",
    right: "0%",
    zIndex: -1,
  },
});

const homeComponents = StyleSheet.create({
  componentLogo: {
    width: 275,
    height: 200,
    resizeMode: "contain",
  },
  componentButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

const homeTexts = StyleSheet.create({
  textSlogan: {
    color: "#FFFFFF",
    fontSize: "25rem",
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    margin: "5%",
  },
  textButton: {
    color: "#222222",
    fontSize: "20rem",
    fontFamily: "Inter-ExtraBold",
  },
});

const homeContainers = StyleSheet.create({
  globalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },
  sloganContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "20%",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },
});
