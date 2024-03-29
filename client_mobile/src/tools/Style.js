// Style.js - Library imports.

import { StyleSheet, Dimensions } from "react-native";

// Style.js - Constant.

const screenWidth = Dimensions.get("window").width;

// Style.js - Container variables.

export const appContainers = StyleSheet.create({
  fullContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
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
  cardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "35%",
  },
  navigationContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#222222",
    width: "100%",
    height: "10%",
  },
  emptyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "70%",
  },
  separateContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: "5%",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  buttonContainer35: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "35%",
  },
  buttonContainer30: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
  },
  buttonContainer20: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "20%",
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

export const appTitleContainers = StyleSheet.create({
  titleContainer30: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "30%",
  },
  titleContainer15: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "15%",
  },
});

export const appScrollViewContainers = StyleSheet.create({
  scrollViewContainer70: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "70%",
  },
  scrollViewContainer50: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%",
  },
});

// Style.js - Text variables.

export const appTexts = StyleSheet.create({
  textBasic15: {
    color: "#FFFFFF",
    fontSize: "15rem",
  },
  textBasic20: {
    color: "#FFFFFF",
    fontSize: "20rem",
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
  textButtonLight: {
    color: "#FFFFFF",
    fontSize: "20rem",
    fontFamily: "Inter-Bold",
  },
  textTitle: {
    color: "#FFFFFF",
    fontSize: "30rem",
    fontFamily: "Inter-Bold",
    paddingLeft: "5%",
  },
  textSubTitle: {
    color: "#FFFFFF",
    fontSize: "15rem",
    paddingLeft: "5%",
  },
});

export const appCardTexts = StyleSheet.create({
  textCard20: {
    color: "#222222",
    fontSize: "20rem",
    fontFamily: "Inter-Bold",
    margin: "5%",
  },
  textCard15: {
    color: "#222222",
    fontSize: "15rem",
    fontFamily: "Inter-Bold",
    margin: "3%",
  },
  textCardGreen: {
    color: "#77DD77",
    fontSize: "20rem",
  },
  textCardYellow: {
    color: "#FDFD96",
    fontSize: "20rem",
  },
  textCardRed: {
    color: "#FF6666",
    fontSize: "20rem",
  },
  textCardBlack: {
    color: "#222222",
    fontSize: "20rem",
  },
});

// Style.js - Component variables.

export const appComponents = StyleSheet.create({
  componentLogo: {
    width: 275,
    height: 200,
    resizeMode: "contain",
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
  componentDropdown: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "60%",
  },
  componentCardScenario: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: screenWidth * 0.8,
  },
  componentCardService: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: screenWidth * 0.8,
  },
  componentModalField: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#222222",
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: 250,
    height: 40,
  },
});

export const appButtonComponents = StyleSheet.create({
  componentButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  componentLargeButton: {
    margin: 40,
    borderRadius: 30,
    overflow: "hidden",
    resizeMode: "contain",
  },
  componentScenarioButton: {
    alignItems: "center",
    backgroundColor: "#424242",
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "25%",
  },
  componentServiceButton: {
    alignItems: "center",
    backgroundColor: "#424242",
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export const appEmptyComponents = StyleSheet.create({
  componentEmpty30: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "30%",
  },
  componentEmpty20: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "20%",
  },
});

// Style.js - Shape variables.

export const appShapes = StyleSheet.create({
  shapeLeft: {
    position: "absolute",
    bottom: "0%",
    left: "0%",
    zIndex: -1,
  },
  shapeMiddle: {
    position: "absolute",
    zIndex: -1,
  },
  shapeRight: {
    position: "absolute",
    top: "0%",
    right: "0%",
    zIndex: -1,
  },
});
