import { StyleSheet } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

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
  buttonTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: baseUnit * 2,
  },
});

export const color = StyleSheet.create({
  opacity1: { opacity: 0.1 },
  opacity3: { opacity: 0.3 },
  opacity5: { opacity: 0.5 },
});

export const text = StyleSheet.create({
  grayMessage: { opacity: 0.3, width: "100%", textAlign: "center" },
});

export const margin = StyleSheet.create({
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
  bottom: {
    marginBottom: baseUnit,
  },
  sides: {
    marginLeft: baseUnit,
    marginRight: baseUnit,
  },
});

export const padding = StyleSheet.create({
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
