// ProfilePage.js - Libraries imports.

import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

// ProfilePage.js - Tools imports.

import * as Style from "../tools/Style";
import { Logos, Shapes } from "../tools/Image";
import { FontContext, resetStorageData } from "../tools/Utils";
import {
  GetServicesQuery,
  GetServicesLinkedQuery,
  PutAccessTokenQuery,
  DeleteServiceQuery,
} from "../tools/Query";

// ProfilePage.js - Custom components.

function CustomProfileIcon(props) {
  const { name, color } = props;

  return (
    <MaterialCommunityIcons
      name={name}
      size={24}
      color={color}
      style={{ paddingLeft: 5 }}
    />
  );
}

function CustomProfileScrollView(props) {
  const {
    navigation,
    servicesList,
    servicesLinkedList,
    setServicesLinkedList,
  } = props;

  const handleLink = (service) => {
    navigation.navigate("UserStack", {
      screen: "Auth",
      params: { service },
    });
  };

  const handleRevoke = async (service) => {
    const newServicesLinkedList = [...servicesLinkedList];
    const index = newServicesLinkedList.findIndex(
      (linkedService) => linkedService.serviceName === service
    );

    try {
      await DeleteServiceQuery(service);
      newServicesLinkedList.splice(index, 1);
      setServicesLinkedList(newServicesLinkedList);
    } catch (error) {
      console.error("[LOG] - Error while deleting service: ", error);
    }
  };

  const isServiceLinked = (serviceName) => {
    return servicesLinkedList.some(
      (linkedService) => linkedService.serviceName === serviceName
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {servicesList.map((service) => (
        <View
          key={service.name}
          style={Style.appComponents.componentCardService}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image source={Logos[service.name + "Logo"]} />

            <View style={Style.appContainers.separateContainer}>
              {isServiceLinked(service.name) && (
                <View>
                  <TouchableOpacity
                    style={Style.appButtonComponents.componentServiceButton}
                    onPress={async () =>
                      await PutAccessTokenQuery(service.name)
                    }
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={Style.appCardTexts.textCardYellow}>
                        Refresh
                      </Text>
                      <CustomProfileIcon name="refresh" color="#FDFD96" />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={Style.appButtonComponents.componentServiceButton}
                    onPress={async () => await handleRevoke(service.name)}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={Style.appCardTexts.textCardRed}>Revoke</Text>
                      <CustomProfileIcon name="close" color="#FF6666" />
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {!isServiceLinked(service.name) && (
                <TouchableOpacity
                  style={Style.appButtonComponents.componentServiceButton}
                  onPress={() => handleLink(service.name)}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={Style.appCardTexts.textCardGreen}>
                      Identify
                    </Text>
                    <CustomProfileIcon name="link" color="#77DD77" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ProfilePage.js - Core function.

export default function ProfilePage({ navigation }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const isFocused = useIsFocused();
  const [servicesList, setServicesList] = useState([]);
  const [servicesLinkedList, setServicesLinkedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesListData = await GetServicesQuery();
        const servicesLinkedListData = await GetServicesLinkedQuery();
        setServicesList(servicesListData);
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

  return (
    <View style={Style.appContainers.globalContainer}>
      <View style={Style.appShapes.shapeRight}>
        <Image source={Shapes.ShapeRight} />
      </View>

      <View style={Style.appTitleContainers.titleContainer15}>
        <Text style={Style.appTexts.textTitle}>Parameters ⚙️</Text>
        <Text style={Style.appTexts.textSubTitle}>Connect your apps here</Text>
      </View>

      <View style={Style.appScrollViewContainers.scrollViewContainer50}>
        <CustomProfileScrollView
          navigation={navigation}
          servicesList={servicesList}
          servicesLinkedList={servicesLinkedList}
          setServicesLinkedList={setServicesLinkedList}
        />
      </View>

      <View style={Style.appButtonContainers.buttonContainer20}>
        <Text style={Style.appTexts.textBasic15}>Bye ! 👋</Text>

        <TouchableOpacity
          style={Style.appButtonComponents.componentButton}
          onPress={async () => {
            await resetStorageData("id", "");
            await resetStorageData("name", "");
            await resetStorageData("token", "");
            navigation.navigate("LoginStack", { screen: "Home" });
          }}
        >
          <Text style={Style.appTexts.textButton}>Disconnect</Text>
        </TouchableOpacity>
      </View>

      <View style={Style.appShapes.shapeLeft}>
        <Image source={Shapes.ShapeLeft} />
      </View>
    </View>
  );
}
