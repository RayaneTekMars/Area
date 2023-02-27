// AuthPage.js - Libraries imports.

import { WebView } from "react-native-webview";
import { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// AuthPage.js - Tools imports.

import * as Style from "../tools/Style";
import { FontContext } from "../tools/Utils";
import {
  GetServiceAuthLinkQuery,
  PostServiceAuthLinkQuery,
} from "../tools/Query";

// AuthPage.js - Core function.

export default function AuthPage({ navigation, route }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const { service } = route.params;
  const [code, setCode] = useState("");
  const [authLink, setAuthLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authLink = await GetServiceAuthLinkQuery(service);
        setAuthLink(authLink);
      } catch (error) {
        console.error("[LOG] - Error fetching authLink: ", error);
      }
    };
    fetchData();
  }, []);

  const handleNavigationStateChange = (navState) => {
    const url = navState.url;
    const regex = /[?&]code=([^&]+)/;
    const match = regex.exec(url);
    if (match !== null) {
      setCode(match[1]);
    }
  };

  if (!authLink) {
    return (
      <View style={Style.appContainers.fullContainer}>
        <Text style={Style.appTexts.textTitle}>
          Loading authentication link...
        </Text>
      </View>
    );
  }

  if (code) {
    PostServiceAuthLinkQuery(navigation, service, code);
  }

  return (
    <View style={Style.appContainers.fullContainer}>
      <View style={Style.appContainers.navigationContainer}>
        <TouchableOpacity
          style={Style.appComponents.componentButton}
          onPress={() =>
            navigation.navigate("UserStack", { screen: "Profile" })
          }
        >
          <Text style={Style.appTexts.textButton}>Close</Text>
        </TouchableOpacity>
      </View>

      <WebView
        source={{ uri: authLink }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
}
