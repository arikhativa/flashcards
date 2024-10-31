import { StyleSheet } from "react-native";

export const container = StyleSheet.create({
  center: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});

const baseUnit = 20;

export const padding = StyleSheet.create({
  base: {
    padding: baseUnit,
  },
  bottom: {
    paddingBottom: baseUnit,
  },
  sides: {
    paddingLeft: baseUnit,
    paddingRight: baseUnit,
  },
});
