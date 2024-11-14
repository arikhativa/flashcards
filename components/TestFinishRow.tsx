import { StyleSheet, View } from "react-native";
import { CardTile } from "./CardTile";
import { IconButton, Icon } from "react-native-paper";
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
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon size={baseUnit * 2} source={cardMeta.success ? "check" : "close"} />
      <CardTile disabledLink card={card} />
      <IconButton
        icon="plus"
        onPress={() => {
          const n = KLToNumber(card.knowledgeLevel) + 1;
          onChangeKnowledgeLevel(index, NumberToKL(n));
        }}
      />
      <IconButton
        icon="minus"
        onPress={() => {
          const n = KLToNumber(card.knowledgeLevel) - 1;
          onChangeKnowledgeLevel(index, NumberToKL(n));
        }}
      />
    </View>
  );
}
