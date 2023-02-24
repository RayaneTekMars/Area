// ViewPage.js - Libraries imports.

import { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

// ViewPage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext } from "../tools/Utils";
import { GetScenariosQuery, DeleteScenarioQuery } from "../tools/Query";

// ViewPage.js - Custom component.

function CustomScrollView(props) {
  const { data, handleEmptyScenario } = props;
  const [items, setItems] = useState(data || []);

  const handleDelete = async (index) => {
    const newItems = [...items];
    const scenarioToDelete = newItems[index].id;

    try {
      await DeleteScenarioQuery(scenarioToDelete);
      newItems.splice(index, 1);
      setItems(newItems);
      if (newItems.length === 0) {
        handleEmptyScenario();
      }
    } catch (error) {
      console.error("[LOG] - Error deleting scenario: ", error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {items.map((item, index) => (
        <View key={index} style={Style.appComponents.componentCardQuery}>
          <Text style={Style.appTexts.textCardQuery20}>{item.name}</Text>
          <Text style={Style.appTexts.textCardQuery15}>
            Trigger ➡️ {item.trigger.name}
          </Text>
          <Text style={Style.appTexts.textCardQuery15}>
            Reaction ⬅️ {item.reaction.name}
          </Text>
          <TouchableOpacity
            style={Style.appComponents.componentDeleteButton}
            onPress={() => handleDelete(index)}
          >
            <MaterialCommunityIcons name="delete" size={24} color="#FF6666" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

// ViewPage.js - Core function.

export default function ViewPage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const [scenario, setScenario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scenario = await GetScenariosQuery();
        setScenario(scenario);
      } catch (error) {
        console.log("[LOG] - Error fetching scenario: ", error);
      }
    };
    fetchData();
  }, []);

  const handleEmptyScenario = () => {
    setScenario([]);
  };

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={require("../../assets/images/amm_shape_right.png")} />
      </View>

      <View style={Style.appTitleContainers.titleContainer15}>
        <Text style={Style.appTexts.textTitle}>Manage 👷</Text>
        <Text style={Style.appTexts.textSubTitle}>Your own scenarios</Text>
      </View>

      <View style={Style.appContainers.scrollViewContainer}>
        {scenario.length > 0 ? (
          <CustomScrollView
            data={scenario}
            handleEmptyScenario={handleEmptyScenario}
          />
        ) : (
          <View style={Style.appContainers.emptyContainer}>
            <Text style={Style.appTexts.textBasic15}>
              It seems to be empty here 👻
            </Text>

            <TouchableOpacity
              style={Style.appComponents.componentButton}
              onPress={() =>
                navigation.navigate("UserStack", { screen: "Create" })
              }
            >
              <Text style={Style.appTexts.textButton}>Create scenario</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={require("../../assets/images/amm_shape_left.png")} />
      </View>
    </View>
  );
}
