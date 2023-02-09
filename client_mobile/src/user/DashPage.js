// DashPage.js - Libraries imports.

import { useState, useEffect, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// DashPage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext } from "../tools/Utils";
import { AddScenarioQuery } from "../tools/Query";

// DashPage.js - Core function.

export default function DashPage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const services = ["Twitter"];
  const triggers = ["NewFollower"];
  const reactions = ["PostTweet"];

  const [name, setName] = useState("");
  const [scenario, setScenario] = useState("");

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
        <TextInput
          style={Style.appComponents.componentField}
          placeholder="Scenario name"
          onChangeText={(userInput) => setScenario(userInput)}
          value={scenario}
        />

        <SelectDropdown
          data={services}
          defaultButtonText={"First service"}
          buttonStyle={Style.appComponents.componentDropdown}
          buttonTextStyle={Style.appTexts.textDropdown}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
        />

        <SelectDropdown
          data={triggers}
          defaultButtonText={"Trigger"}
          buttonStyle={Style.appComponents.componentDropdown}
          buttonTextStyle={Style.appTexts.textDropdown}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
        />

        <SelectDropdown
          data={services}
          defaultButtonText={"Second service"}
          buttonStyle={Style.appComponents.componentDropdown}
          buttonTextStyle={Style.appTexts.textDropdown}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
        />

        <SelectDropdown
          data={reactions}
          defaultButtonText={"Reaction"}
          buttonStyle={Style.appComponents.componentDropdown}
          buttonTextStyle={Style.appTexts.textDropdown}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
        />

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => AddScenarioQuery()}
        >
          <Text style={Style.appTexts.textButton}>Add scenario</Text>
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
