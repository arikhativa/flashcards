import { StyleSheet, View } from "react-native";
import { IconButton, Icon, useTheme } from "react-native-paper";
import { Card } from "@/types/Card";
import { CardMeta } from "@/types/TestSettings";
import { baseUnit } from "@/constants/styles";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { KLToNumber, NumberToKL } from "@/utils/knowledgeLevel";
import { CardTile } from "../cards/CardTile";

interface TestFinishRowProps {
  scrollToPage: (index: number) => void;
  index: number;
  card: Card;
  cardMeta: CardMeta;
  onChangeKnowledgeLevel: (index: number, newKL: KnowledgeLevel) => void;
}

export default function TestFinishRow({
  scrollToPage,
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
        style={{ margin: 0, padding: 0 }}
        size={baseUnit * 1.5}
        mode="contained-tonal"
        containerColor={getContainerColor(cardMeta.success)}
        icon={cardMeta.success ? "check" : "close"}
      ></IconButton>
      <View style={{ flex: 1 }}>
        <CardTile onPress={() => scrollToPage(index)} card={card} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <IconButton
          size={baseUnit * 1.5}
          mode="contained"
          icon="plus"
          onPress={() => {
            const n = KLToNumber(card.knowledgeLevel) + 1;
            onChangeKnowledgeLevel(index, NumberToKL(n));
          }}
        />
        <IconButton
          size={baseUnit * 1.5}
          mode="contained"
          icon="minus"
          onPress={() => {
            const n = KLToNumber(card.knowledgeLevel) - 1;
            onChangeKnowledgeLevel(index, NumberToKL(n));
          }}
        />
      </View>
    </View>
  );
}
