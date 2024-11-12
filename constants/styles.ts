import { StyleSheet } from "react-native";
import { KnowledgeLevelColor } from "../types/KnowledgeLevel";

export const baseUnit = 10;
export const BORDER_SIZE = 30;

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
  fullScreen: {
    height: "100%",
    width: "100%",
  },
  hFull: {
    height: "100%",
  },
  wFull: {
    width: "100%",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
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

export const KLMark = StyleSheet.create({
  Learning: {
    borderBottomColor: KnowledgeLevelColor.Learning,
    borderBottomWidth: BORDER_SIZE,
  },
  GettingThere: {
    borderBottomColor: KnowledgeLevelColor.GettingThere,
    borderBottomWidth: BORDER_SIZE,
  },
  Confident: {
    borderBottomColor: KnowledgeLevelColor.Confident,
    borderBottomWidth: BORDER_SIZE,
  },
});

export const color = StyleSheet.create({
  bgTransparent: { backgroundColor: "transparent" },
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

export const gap = StyleSheet.create({
  base: {
    gap: baseUnit / 5,
  },
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
  top3: {
    marginTop: baseUnit * 3,
  },
  top4: {
    marginTop: baseUnit * 4,
  },
  bottom: {
    marginBottom: baseUnit,
  },
  bottom2: {
    marginBottom: baseUnit * 2,
  },
  x: {
    marginLeft: baseUnit,
    marginRight: baseUnit,
  },
  x2: {
    marginLeft: baseUnit * 2,
    marginRight: baseUnit * 2,
  },
  y: {
    marginTop: baseUnit,
    marginBottom: baseUnit,
  },
  y2: {
    marginTop: baseUnit * 2,
    marginBottom: baseUnit * 2,
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
  x: {
    paddingLeft: baseUnit,
    paddingRight: baseUnit,
  },
});
