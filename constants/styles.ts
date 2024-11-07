import { StyleSheet } from "react-native";

export const baseUnit = 10;

export const container = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  center: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  flexXSpace: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  flexX: {
    display: "flex",
    flexDirection: "row",
  },
  space: {
    justifyContent: "space-between",
  },
  wFull: {
    width: "100%",
  },
  buttonTop: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
  },
  buttonBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: baseUnit * 2,
  },
  buttonTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: baseUnit * 2,
  },
});

export const color = StyleSheet.create({
  bgPurple: { backgroundColor: "purple" },
  bgGreen: { backgroundColor: "green" },
  bgPink: { backgroundColor: "pink" },
  bgBlue: { backgroundColor: "blue" },
  bgRed: { backgroundColor: "red" },
  opacity1: { opacity: 0.1 },
  opacity3: { opacity: 0.3 },
  opacity5: { opacity: 0.5 },
});

export const text = StyleSheet.create({
  grayMessage: { opacity: 0.3, width: "100%", textAlign: "center" },
});

export const margin = StyleSheet.create({
  none: {
    margin: 0,
  },
  base: {
    margin: baseUnit,
  },
  base2: {
    margin: baseUnit * 2,
  },
  base3: {
    margin: baseUnit * 3,
  },
  base4: {
    margin: baseUnit * 4,
  },
  left: {
    marginLeft: baseUnit,
  },
  top: {
    marginTop: baseUnit,
  },
  top2: {
    marginTop: baseUnit * 2,
  },
  bottom: {
    marginBottom: baseUnit,
  },
  sides: {
    marginLeft: baseUnit,
    marginRight: baseUnit,
  },
});

export const padding = StyleSheet.create({
  none: {
    padding: 0,
  },
  base: {
    padding: baseUnit,
  },
  left: {
    paddingLeft: baseUnit,
  },
  top: {
    paddingTop: baseUnit,
  },
  bottom: {
    paddingBottom: baseUnit,
  },
  sides: {
    paddingLeft: baseUnit,
    paddingRight: baseUnit,
  },
});
