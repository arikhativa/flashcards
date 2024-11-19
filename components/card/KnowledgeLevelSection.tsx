import { baseUnit, padding } from "@/constants/styles";
import { StyleProp, View, ViewStyle } from "react-native";
import { Card as PaperCard, Text, Button } from "react-native-paper";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import {
  knowledgeLevelToColor,
  knowledgeLevelToName,
} from "@/utils/knowledgeLevel";

interface KnowledgeLevelSectionProps {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  knowledgeLevel: KnowledgeLevel;
  setKnowledgeLevel: (level: KnowledgeLevel) => void;
}

export default function KnowledgeLevelSection({
  style,
  knowledgeLevel,
  disabled,
  setKnowledgeLevel,
}: KnowledgeLevelSectionProps) {
  const getButton = (kl: KnowledgeLevel) => {
    return (
      <Button
        textColor={
          knowledgeLevel === kl ? undefined : knowledgeLevelToColor(kl)
        }
        buttonColor={
          knowledgeLevel === kl ? knowledgeLevelToColor(kl) : undefined
        }
        style={{
          borderRadius: 0,
          width: "100%",
          borderColor: knowledgeLevelToColor(kl),
        }}
        mode={knowledgeLevel === kl ? "contained" : "outlined"}
        onPress={() => setKnowledgeLevel(kl)}
      >
        {knowledgeLevelToName(kl)}
      </Button>
    );
  };
  return (
    <View style={[style]}>
      <Text style={padding.bottom} variant="titleMedium">
        Knowledge Level
      </Text>
      <PaperCard>
        <PaperCard.Content>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: baseUnit,
              justifyContent: "center",
              alignItems: "center",
            }}
            pointerEvents={disabled ? "none" : "auto"}
          >
            {getButton(KnowledgeLevel.Learning)}
            {getButton(KnowledgeLevel.GettingThere)}
            {getButton(KnowledgeLevel.Confident)}
          </View>
        </PaperCard.Content>
      </PaperCard>
    </View>
  );
}
