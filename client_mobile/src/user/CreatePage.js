// CreatePage.js - Libraries imports.

import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from "react-native";

// CreatePage.js - Tools imports.

import * as Style from "../tools/Style";
import { Shapes } from "../tools/Image";
import { FontContext } from "../tools/Utils";
import {
  PostScenarioQuery,
  GetServicesLinkedQuery,
  GetServiceTriggersQuery,
  GetServiceReactionsQuery,
  GetTriggerParamsQuery,
  GetReactionParamsQuery,
} from "../tools/Query";

// CreatePage.js - Custom component.

function CustomCreateModal(props) {
  const { type, name, service, modalVisible, setModalVisible } = props;

  console.log("[LOG] - Name: ", name);
  console.log("[LOG] - Service: ", service);

  const [params, setParams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "trigger" && name.length > 0) {
          const paramsListData = await GetTriggerParamsQuery(service, name);
          setParams(paramsListData);
        } else if (type === "reaction" && name.length > 0) {
          const paramsListData = await GetReactionParamsQuery(service, name);
          setParams(paramsListData);
        }
      } catch (error) {
        console.error("[LOG] - Error while fetching params: ", error);
      }
    };
    fetchData();
  }, [service, name]);

  console.log("[LOG] - Params: ", params);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View style={{ backgroundColor: "#fff", padding: 20 }}>
          <Text>Hello, I am a modal!</Text>
          <Text>{params.length}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

// CreatePage.js - Core function.

export default function CreatePage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const isFocused = useIsFocused();
  const [servicesLinkedList, setServicesLinkedList] = useState([]);
  const [triggerModalVisible, setTriggerModalVisible] = useState(false);
  const [reactionModalVisible, setReactionModalVisible] = useState(false);

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

  const [triggers, setTriggers] = useState([]);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (firstService) {
          const triggersListData = await GetServiceTriggersQuery(firstService);
          setTriggers(triggersListData);
        }
      } catch (error) {
        console.error("[LOG] - Error while fetching triggers: ", error);
      }
    };
    fetchData();
  }, [firstService]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (secondService) {
          const reactionsListData = await GetServiceReactionsQuery(
            secondService
          );
          setReactions(reactionsListData);
        }
      } catch (error) {
        console.error("[LOG] - Error while fetching reactions: ", error);
      }
    };
    fetchData();
  }, [secondService]);

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
                  data={triggers.map((item) => item.name)}
                  defaultButtonText={"Trigger"}
                  dropdownStyle={{ borderRadius: 20 }}
                  buttonStyle={Style.appComponents.componentDropdown}
                  buttonTextStyle={Style.appTexts.textButton}
                  onSelect={(selectedItem) => {
                    const trigger = triggers.find(
                      (trigger) => trigger.name === selectedItem
                    );
                    const fieldsAreEmpty = trigger.fields.length === 0;

                    if (fieldsAreEmpty) {
                      setTrigger(selectedItem);
                    } else {
                      setTriggerModalVisible(true);
                      setTrigger(selectedItem);
                    }
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                />
              ) : null}

              {firstService.length > 0 && trigger.length > 0 ? (
                <CustomCreateModal
                  type="trigger"
                  name={trigger}
                  service={firstService}
                  modalVisible={triggerModalVisible}
                  setModalVisible={setTriggerModalVisible}
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
                  data={reactions.map((item) => item.name)}
                  defaultButtonText={"Reaction"}
                  dropdownStyle={{ borderRadius: 20 }}
                  buttonStyle={Style.appComponents.componentDropdown}
                  buttonTextStyle={Style.appTexts.textButton}
                  onSelect={(selectedItem) => {
                    const reaction = reactions.find(
                      (reaction) => reaction.name === selectedItem
                    );
                    const fieldsAreEmpty = reaction.fields.length === 0;

                    if (fieldsAreEmpty) {
                      setReaction(selectedItem);
                    } else {
                      setReactionModalVisible(true);
                      setReaction(selectedItem);
                    }
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

            {secondService.length > 0 && reaction.length > 0 ? (
              <CustomCreateModal
                type="reaction"
                name={reaction}
                service={secondService}
                modalVisible={reactionModalVisible}
                setModalVisible={setReactionModalVisible}
              />
            ) : null}

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
