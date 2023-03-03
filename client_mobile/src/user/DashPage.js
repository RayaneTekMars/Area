// DashPage.js - Libraries imports.

import { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// DashPage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext } from "../tools/Utils";
import { Shapes, Buttons } from "../tools/Image";

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
        const nameData = await AsyncStorage.getItem("name");
        setName(nameData);
      } catch (error) {
        console.error("[LOG] - Error while fetching name: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={Shapes.ShapeRight} />
      </View>

      <View style={Style.appTitleContainers.titleContainer30}>
        <Text style={Style.appTexts.textTitle}>Hello {name} 💫</Text>
        <Text style={Style.appTexts.textSubTitle}>Nice to see you again</Text>
      </View>

      <View style={Style.appContainers.cardContainer}>
        <Text style={Style.appTexts.textBasic15}>
          What do you want to do today ? 📍
        </Text>

        <TouchableOpacity
          activeOpacity={1}
          style={Style.appButtonComponents.componentLargeButton}
          onPress={() => navigation.navigate("UserStack", { screen: "Create" })}
        >
          <Image source={Buttons.CreateButton} />
        </TouchableOpacity>

        <View style={Style.appShapes.shapeMiddle}>
          <Image source={Shapes.GreyBar} />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          style={Style.appButtonComponents.componentLargeButton}
          onPress={() => navigation.navigate("UserStack", { screen: "View" })}
        >
          <Image source={Buttons.ManageButton} />
        </TouchableOpacity>
      </View>

      <View style={Style.appButtonContainers.buttonContainer35}>
        <Text style={Style.appTexts.textBasic15}>
          Start connecting your apps now ! 💡
        </Text>

        <TouchableOpacity
          style={Style.appButtonComponents.componentButton}
          onPress={() =>
            navigation.navigate("UserStack", { screen: "Profile" })
          }
        >
          <Text style={Style.appTexts.textButton}>Parameters</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={Shapes.ShapeLeft} />
      </View>
    </View>
  );
}
