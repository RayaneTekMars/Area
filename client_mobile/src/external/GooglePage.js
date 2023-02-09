// GooglePage.js - Libraries imports.

import { WebView } from "react-native-webview";
import { View, Text, TouchableOpacity } from "react-native";

// GooglePage.js - Core function.

export default function GooglePage({ navigation }) {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 100,
            backgroundColor: "#333",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{ color: "#fff", padding: 10 }}>Close</Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{ uri: "https://google.com/" }}
          style={{ flex: 1 }}
        />
      </View>
    );
  };
  