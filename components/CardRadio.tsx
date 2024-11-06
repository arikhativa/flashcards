import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { KnowledgeLevel, KnowledgeLevelColor } from "@/types/KnowledgeLevel";
import { useEffect, useState } from "react";
import { knowledgeLevelToColor } from "@/utils/knowledgeLevel";
import { container } from "@/constants/styles";

export type CardRadioProps = {
  level: KnowledgeLevel;
  cardKL: KnowledgeLevel;
  onPress: (level: KnowledgeLevel) => void;
};

export function CardRadio({ level, cardKL, onPress }: CardRadioProps) {
  const [levelColor, setLevelColor] = useState<KnowledgeLevelColor>(
    KnowledgeLevelColor.Learning
  );

  useEffect(() => {
    setLevelColor(knowledgeLevelToColor(level));
  }, [level]);

  return (
    <View style={[container.flexX, container.space, container.wFull]}>
      <Text variant="labelLarge">{level}</Text>
      <RadioButton
        value={level}
        uncheckedColor={levelColor}
        color={levelColor}
        status={cardKL === level ? "checked" : "unchecked"}
        onPress={() => onPress(level)}
      />
    </View>
  );
}
