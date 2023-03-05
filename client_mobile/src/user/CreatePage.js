// CreatePage.js - Libraries imports.

import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

// CreatePage.js - Tools imports.

import * as Style from "../tools/Style";
import { Shapes } from "../tools/Image";
import { FontContext } from "../tools/Utils";
import { PostScenarioQuery, GetServicesLinkedQuery } from "../tools/Query";

// CreatePage.js - Core function.

export default function CreatePage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const isFocused = useIsFocused();
  const [servicesLinkedList, setServicesLinkedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesLinkedListData = await GetServicesLinkedQuery();
        setServicesLinkedList(servicesLinkedListData);
      } catch (error) {
        console.error("[LOG] - Error while fetching services: ", error);
      }
    };
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      setServicesLinkedList(servicesLinkedList);
    }
  }, [isFocused]);

  const [scenario, setScenario] = useState("");
  const [firstService, setFirstService] = useState("");
  const [trigger, setTrigger] = useState("");
  const [secondService, setSecondService] = useState("");
  const [reaction, setReaction] = useState("");

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={Shapes.ShapeRight} />
      </View>

      <View style={Style.appTitleContainers.titleContainer30}>
        <Text style={Style.appTexts.textTitle}>Customize 🧩</Text>
        <Text style={Style.appTexts.textSubTitle}>Your unique scenario</Text>
      </View>

      <>
        {servicesLinkedList.length > 0 ? (
          <>
            <View style={Style.appContainers.cardContainer}>
              <TextInput
                style={Style.appComponents.componentField}
                placeholder="Scenario name"
                onChangeText={(userInput) => setScenario(userInput)}
                value={scenario}
              />

              <SelectDropdown
                data={servicesLinkedList.map((item) => item.serviceName)}
                defaultButtonText={"First service"}
                dropdownStyle={{ borderRadius: 20 }}
                buttonStyle={Style.appComponents.componentDropdown}
                buttonTextStyle={Style.appTexts.textButton}
                onSelect={(selectedItem) => {
                  setFirstService(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
              />

              {firstService.length > 0 ? (
                <SelectDropdown
                  data={[]}
                  defaultButtonText={"Trigger"}
                  dropdownStyle={{ borderRadius: 20 }}
                  buttonStyle={Style.appComponents.componentDropdown}
                  buttonTextStyle={Style.appTexts.textButton}
                  onSelect={(selectedItem) => {
                    setTrigger(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                />
              ) : null}

              <SelectDropdown
                data={servicesLinkedList.map((item) => item.serviceName)}
                defaultButtonText={"Second service"}
                dropdownStyle={{ borderRadius: 20 }}
                buttonStyle={Style.appComponents.componentDropdown}
                buttonTextStyle={Style.appTexts.textButton}
                onSelect={(selectedItem) => {
                  setSecondService(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
              />

              {secondService.length > 0 ? (
                <SelectDropdown
                  data={[]}
                  defaultButtonText={"Reaction"}
                  dropdownStyle={{ borderRadius: 20 }}
                  buttonStyle={Style.appComponents.componentDropdown}
                  buttonTextStyle={Style.appTexts.textButton}
                  onSelect={(selectedItem) => {
                    setReaction(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                />
              ) : null}
            </View>

            <View style={Style.appButtonContainers.buttonContainer35}>
              <Text style={Style.appTexts.textBasic15}>
                Done ? Let's go ! 🚀
              </Text>

              <TouchableOpacity
                style={Style.appButtonComponents.componentButton}
                onPress={async () =>
                  await PostScenarioQuery(
                    navigation,
                    scenario,
                    firstService,
                    trigger,
                    secondService,
                    reaction
                  )
                }
              >
                <Text style={Style.appTexts.textButton}>Add scenario</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={Style.appContainers.emptyContainer}>
            <View style={Style.appEmptyComponents.componentEmpty20}>
              <Text style={Style.appTexts.textBasic15}>No apps found 🔌</Text>

              <TouchableOpacity
                style={Style.appButtonComponents.componentButton}
                onPress={() =>
                  navigation.navigate("UserStack", { screen: "Profile" })
                }
              >
                <Text style={Style.appTexts.textButton}>Parameters</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={Shapes.ShapeLeft} />
      </View>
    </View>
  );
}
