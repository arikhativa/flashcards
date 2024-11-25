import { padding } from "@/constants/styles";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel, KnowledgeLevelColor } from "@/types/KnowledgeLevel";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  Card as PaperCard,
  Text,
  TextInput,
  Divider,
} from "react-native-paper";
import Plasters from "./Plasters";

interface CardSidesProps {
  knowledgeLevel: KnowledgeLevel;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  sideA: string;
  sideB: string;
  hideSideA?: boolean;
  hideSideB?: boolean;
  onChangeTextA?: (text: string) => void;
  onChangeTextB?: (text: string) => void;
  borderSize?: number;
  cardHeight?: number;
}

const HEIGHT = 200;
const BORDER_SIZE = 30;

export default function CardSides({
  knowledgeLevel,
  style,
  disabled,
  sideA,
  sideB,
  hideSideA,
  hideSideB,
  onChangeTextA,
  onChangeTextB,
  borderSize,
  cardHeight,
}: CardSidesProps) {
  const { conf } = useStore();
  const border = borderSize || BORDER_SIZE;
  const height = cardHeight || HEIGHT;

  const getKLStyle = () => {
    switch (knowledgeLevel) {
      case KnowledgeLevel.Learning:
        return {
          borderBottomColor: KnowledgeLevelColor.Learning,
          borderBottomWidth: border,
        };
      case KnowledgeLevel.GettingThere:
        return {
          borderBottomColor: KnowledgeLevelColor.GettingThere,
          borderBottomWidth: border,
        };
      case KnowledgeLevel.Confident:
        return {
          borderBottomColor: KnowledgeLevelColor.Confident,
          borderBottomWidth: border,
        };
      default:
        return {};
    }
  };

  return (
    <PaperCard style={[style, getKLStyle()]}>
      <PaperCard.Content>
        <View style={[styles.sideView, { height: height }]}>
          <Text style={styles.labelText} variant="titleLarge">
            {conf.sideA}
          </Text>
          {!hideSideA ? (
            <TextInput
              editable={!disabled}
              style={[styles.comment, styles.textInput]}
              onChangeText={!disabled ? onChangeTextA : undefined}
              value={sideA}
            ></TextInput>
          ) : (
            <Plasters cardHeight={height} />
          )}
        </View>
        <Divider />
        <View style={[styles.sideView, { height: height - border }]}>
          <Text style={[styles.labelText, padding.top]} variant="titleLarge">
            {conf.sideB}
          </Text>
          {!hideSideB ? (
            <TextInput
              editable={!disabled}
              style={[styles.comment, styles.textInput]}
              onChangeText={!disabled ? onChangeTextB : undefined}
              value={sideB}
            ></TextInput>
          ) : (
            <Plasters cardHeight={height} />
          )}
        </View>
      </PaperCard.Content>
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  KLRadioContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  KLRadio: {
    display: "flex",
  },

  sideView: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  comment: {
    backgroundColor: "transparent",
  },
  textInput: {
    width: "90%",
    textAlign: "center",
  },
});
