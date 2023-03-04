// AuthPage.js - Libraries imports.

import { WebView } from "react-native-webview";
import { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// AuthPage.js - Tools imports.

import * as Style from "../tools/Style";
import { Shapes } from "../tools/Image";
import { FontContext } from "../tools/Utils";
import { GetServiceLinkQuery, PostServiceLinkQuery } from "../tools/Query";

// AuthPage.js - Core function.

export default function AuthPage({ navigation, route }) {
  const fontsLoaded = useContext(FontContext);

  if (!fontsLoaded) {
    return null;
  }

  const { service } = route.params;
  const [code, setCode] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const linkData = await GetServiceLinkQuery(service);
        setLink(linkData);
      } catch (error) {
        console.error(
          "[LOG] - Error while fetching authentication link: ",
          error
        );
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

  if (!link) {
    return (
      <View style={Style.appContainers.globalContainer}>
        <View style={Style.appShapes.shapeRight}>
          <Image source={Shapes.ShapeRight} />
        </View>

        <Text style={Style.appTexts.textBasic20}>
          Loading authentication link...
        </Text>

        <View style={Style.appShapes.shapeLeft}>
          <Image source={Shapes.ShapeLeft} />
        </View>
      </View>
    );
  }

  if (code) {
    PostServiceLinkQuery(navigation, service, code);
  }

  return (
    <View style={Style.appContainers.fullContainer}>
      <View style={Style.appContainers.navigationContainer}>
        <TouchableOpacity
          style={Style.appButtonComponents.componentButton}
          onPress={() =>
            navigation.navigate("UserStack", { screen: "Profile" })
          }
        >
          <Text style={Style.appTexts.textButton}>Close</Text>
        </TouchableOpacity>
      </View>

      <WebView
        source={{ uri: link }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
}
