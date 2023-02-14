// CreatePage.js - Libraries imports.

import { useState, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// CreatePage.js - Tools imports.

import * as Style from "../tools/Style";
import { AddScenarioQuery } from "../tools/Query";
import { FontContext, Services, Triggers, Reactions } from "../tools/Utils";

// CreatePage.js - Core function.

export default function CreatePage() {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const [scenario, setScenario] = useState("");

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={require("../../assets/images/amm_shape_right.png")} />
      </View>

      <View style={Style.appContainers.titleContainer}>
        <Text style={Style.appTexts.textTitle}>Customize 🧩</Text>
        <Text style={Style.appTexts.textSubTitle}>Your unique scenario</Text>
      </View>

      <View style={Style.appContainers.cardContainer}>
        <TextInput
          style={Style.appComponents.componentField}
          placeholder="Scenario name"
          onChangeText={(userInput) => setScenario(userInput)}
          value={scenario}
        />

        <SelectDropdown
          data={Services}
          defaultButtonText={"First service"}
          dropdownStyle={{ borderRadius: 20 }}
          buttonStyle={Style.appComponents.componentDropdown}
          buttonTextStyle={Style.appTexts.textButton}
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
          data={Triggers}
          defaultButtonText={"Trigger"}
          dropdownStyle={{ borderRadius: 20 }}
          buttonStyle={Style.appComponents.componentDropdown}
          buttonTextStyle={Style.appTexts.textButton}
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
          data={Services}
          defaultButtonText={"Second service"}
          dropdownStyle={{ borderRadius: 20 }}
          buttonStyle={Style.appComponents.componentDropdown}
          buttonTextStyle={Style.appTexts.textButton}
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
          data={Reactions}
          defaultButtonText={"Reaction"}
          dropdownStyle={{ borderRadius: 20 }}
          buttonStyle={Style.appComponents.componentDropdown}
          buttonTextStyle={Style.appTexts.textButton}
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
      </View>

      <View style={Style.appButtonContainers.buttonContainer35}>
        <Text style={Style.appTexts.textBasic15}>Done ? Let's go ! 🚀</Text>

        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() => AddScenarioQuery()}
        >
          <Text style={Style.appTexts.textButton}>Add scenario</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
