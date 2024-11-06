import { StyleSheet } from "react-native";

export const baseUnit = 10;

export const container = StyleSheet.create({
  center: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
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
