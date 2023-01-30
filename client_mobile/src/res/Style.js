// Style.js - Library import.

import { StyleSheet } from "react-native";

// Style.js - CSS variables.

export const appContainers = StyleSheet.create({
  globalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },
  sloganContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "20%",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "30%",
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "35%",
  }
});

export const appTexts = StyleSheet.create({
  textBasic15: {
    color: "#FFFFFF",
    fontSize: "15rem",
    fontFamiy: "Inter-Bold",
  },
  textBasic20: {
    color: "#FFFFFF",
    fontSize: "20rem",
    fontFamiy: "Inter-Bold",
  },
  textSlogan: {
    color: "#FFFFFF",
    fontSize: "25rem",
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    margin: "5%",
  },
  textButton: {
    color: "#222222",
    fontSize: "20rem",
    fontFamily: "Inter-Bold",
  },
  textHello: {
    color: "#FFFFFF",
    fontSize: "30rem",
    fontFamily: "Inter-Bold",
    paddingLeft: "5%",
  },
  textWelcome: {
    color: "#FFFFFF",
    fontSize: "15rem",
    paddingLeft: "5%",
  },
});

export const appComponents = StyleSheet.create({
  componentLogo: {
    width: 275,
    height: 200,
    resizeMode: "contain",
  },
  componentButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  componentField: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "60%",
  },
});

export const appShapes = StyleSheet.create({
  shapeLeft: {
    position: "absolute",
    bottom: "0%",
    left: "0%",
    zIndex: -1,
  },
  shapeRight: {
    position: "absolute",
    top: "0%",
    right: "0%",
    zIndex: -1,
  },
});

export const appButtonContainers = StyleSheet.create({
  buttonContainer40: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },
  buttonContainer30: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
  },
});

export const appFormContainers = StyleSheet.create({
  formContainer30: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
  },
  formContainer20: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "20%",
  },
});
