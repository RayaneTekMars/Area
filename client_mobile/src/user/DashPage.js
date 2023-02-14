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
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => navigation.navigate("Create")}
        >
          <Text style={Style.appTexts.textButton}>Create a scenario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => navigation.navigate("View")}
        >
          <Text style={Style.appTexts.textButton}>View your scenario</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appButtonContainers.buttonContainer35}>
        <Text style={Style.appTexts.textBasic15}>
          Start connecting your apps now ! 💡
        </Text>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => navigation.navigate("Profile")}
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
