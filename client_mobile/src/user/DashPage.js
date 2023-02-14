// DashPage.js - Libraries imports.

import { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// DashPage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext } from "../tools/Utils";

// DashPage.js - Core function.

export default function DashPage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = await AsyncStorage.getItem("name");
        setName(name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={require("../../assets/images/amm_shape_right.png")} />
      </View>

      <View style={Style.appContainers.titleContainer}>
        <Text style={Style.appTexts.textTitle}>Hello {name} 💫</Text>
        <Text style={Style.appTexts.textSubTitle}>Nice to see you again</Text>
      </View>

      <View style={Style.appContainers.cardContainer}>
        <Text style={Style.appTexts.textBasic15}>
          What do you want to do today ? 📍
        </Text>

        <TouchableOpacity
          style={Style.appComponents.componentLargeButton}
          onPress={() => navigation.navigate("UserStack", { screen: "Create" })}
        >
          <Image source={require("../../assets/images/create_button.png")} />
        </TouchableOpacity>

        <View style={Style.appShapes.shapeMiddle}>
          <Image source={require("../../assets/images/grey_bar.png")} />
        </View>

        <TouchableOpacity
          style={Style.appComponents.componentLargeButton}
          onPress={() => navigation.navigate("UserStack", { screen: "View" })}
        >
          <Image source={require("../../assets/images/manage_button.png")} />
        </TouchableOpacity>
      </View>

      <View style={Style.appButtonContainers.buttonContainer35}>
        <Text style={Style.appTexts.textBasic15}>
          Start connecting your apps now ! 💡
        </Text>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() =>
            navigation.navigate("UserStack", { screen: "Profile" })
          }
        >
          <Text style={Style.appTexts.textButton}>Parameters</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
