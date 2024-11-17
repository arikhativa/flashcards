import { StyleSheet, View } from "react-native";
import { CardTile } from "./CardTile";
import { IconButton, Icon, useTheme } from "react-native-paper";
import { Card } from "@/types/Card";
import { CardMeta } from "@/types/TestSettings";
import { baseUnit } from "@/constants/styles";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { KLToNumber, NumberToKL } from "@/utils/knowledgeLevel";

interface TestFinishRowProps {
  index: number;
  card: Card;
  cardMeta: CardMeta;
  onChangeKnowledgeLevel: (index: number, newKL: KnowledgeLevel) => void;
}

export default function TestFinishRow({
  index,
  card,
  cardMeta,
  onChangeKnowledgeLevel,
}: TestFinishRowProps) {
  const { colors } = useTheme();

  const getContainerColor = (success?: boolean) => {
    if (!success) {
      return colors.errorContainer;
    }
    return colors.primaryContainer;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton
        mode="contained-tonal"
        containerColor={getContainerColor(cardMeta.success)}
        icon={cardMeta.success ? "check" : "close"}
      ></IconButton>
      <View style={{ flex: 1 }}>
        <CardTile disabledLink card={card} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          mode="contained"
          icon="minus"
          onPress={() => {
            const n = KLToNumber(card.knowledgeLevel) - 1;
            onChangeKnowledgeLevel(index, NumberToKL(n));
          }}
        />
        <IconButton
          mode="contained"
          icon="plus"
          onPress={() => {
            const n = KLToNumber(card.knowledgeLevel) + 1;
            onChangeKnowledgeLevel(index, NumberToKL(n));
          }}
        />
      </View>
    </View>
  );
}
