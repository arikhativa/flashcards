import { padding } from "@/constants/styles";
import { useStore } from "@/providers/GlobalStore";
import { KnowledgeLevel, KnowledgeLevelColor } from "@/types/KnowledgeLevel";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  Card as PaperCard,
  Text,
  TextInput,
  Divider,
} from "react-native-paper";

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
}

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
}: CardSidesProps) {
  const { conf } = useStore();

  const getKLStyle = () => {
    switch (knowledgeLevel) {
      case KnowledgeLevel.Learning:
        return styles.Learning;
      case KnowledgeLevel.GettingThere:
        return styles.GettingThere;
      case KnowledgeLevel.Confident:
        return styles.Confident;
      default:
        return {};
    }
  };
  return (
    <PaperCard style={[style, getKLStyle()]}>
      <PaperCard.Content>
        <View style={[styles.sideView, styles.sideViewHeightA]}>
          <Text style={styles.labelText} variant="titleLarge">
            {conf.sideA}
          </Text>
          <TextInput
            disabled={disabled}
            style={[styles.comment, styles.textInput]}
            onChangeText={!disabled ? onChangeTextA : undefined}
            value={hideSideA ? "?" : sideA}
          ></TextInput>
        </View>
        <Divider />
        <View style={[styles.sideView, styles.sideViewHeightB]}>
          <Text style={[styles.labelText, padding.top]} variant="titleLarge">
            {conf.sideB}
          </Text>
          <TextInput
            disabled={disabled}
            style={[styles.comment, styles.textInput]}
            onChangeText={!disabled ? onChangeTextB : undefined}
            value={hideSideB ? "?" : sideB}
          ></TextInput>
        </View>
      </PaperCard.Content>
    </PaperCard>
  );
}

const HEIGHT = 200;
const BORDER_SIZE = 30;

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
  sideViewHeightA: {
    height: HEIGHT,
  },
  sideViewHeightB: {
    height: HEIGHT - BORDER_SIZE,
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
