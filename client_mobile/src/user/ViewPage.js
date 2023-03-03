// ViewPage.js - Libraries imports.

import { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

// ViewPage.js - Tools imports.

import * as Style from "../tools/Style";
import { Shapes } from "../tools/Image";
import { FontContext } from "../tools/Utils";
import { GetScenariosQuery, DeleteScenarioQuery } from "../tools/Query";

// ViewPage.js - Custom component.

function CustomViewScrollView(props) {
  const { scenariosList, handleEmptyScenario } = props;
  const [items, setItems] = useState(scenariosList || []);

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
      console.error("[LOG] - Error while deleting scenario: ", error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {items.map((item, index) => (
        <View key={index} style={Style.appComponents.componentCardScenario}>
          <Text style={Style.appCardTexts.textCard20}>{item.name}</Text>

          <Text style={Style.appCardTexts.textCard15}>
            Trigger ➡️ {item.trigger.name}
          </Text>

          <Text style={Style.appCardTexts.textCard15}>
            Reaction ⬅️ {item.reaction.name}
          </Text>

          <TouchableOpacity
            style={Style.appButtonComponents.componentScenarioButton}
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

  const [scenariosList, setScenariosList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scenariosData = await GetScenariosQuery();
        setScenariosList(scenariosData);
      } catch (error) {
        console.error("[LOG] - Error while fetching scenarios: ", error);
      }
    };
    fetchData();
  }, []);

  const handleEmptyScenario = () => {
    setScenariosList([]);
  };

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={Shapes.ShapeRight} />
      </View>

      <View style={Style.appTitleContainers.titleContainer15}>
        <Text style={Style.appTexts.textTitle}>Manage 👷</Text>
        <Text style={Style.appTexts.textSubTitle}>Your own scenarios</Text>
      </View>

      <View style={Style.appScrollViewContainers.scrollViewContainer70}>
        {scenariosList.length > 0 ? (
          <CustomViewScrollView
            scenariosList={scenariosList}
            handleEmptyScenario={handleEmptyScenario}
          />
        ) : (
          <View style={Style.appContainers.emptyContainer}>
            <Text style={Style.appTexts.textBasic15}>
              It seems to be empty here 👻
            </Text>

            <TouchableOpacity
              style={Style.appButtonComponents.componentButton}
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
        <Image source={Shapes.ShapeLeft} />
      </View>
    </View>
  );
}
