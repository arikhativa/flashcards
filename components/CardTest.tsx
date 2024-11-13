import { StyleSheet, View } from "react-native";
import CardSides from "./CardSides";
import { Card } from "@/types/Card";
import { margin } from "@/constants/styles";

interface CardTestProps {
  hideSideA?: boolean;
  hideSideB?: boolean;
  card: Card;
}

export default function CardTest({
  card,
  hideSideA,
  hideSideB,
}: CardTestProps) {
  return (
    <View>
      <CardSides
        style={margin.base2}
        knowledgeLevel={card.knowledgeLevel}
        sideA={card.sideA}
        sideB={card.sideB}
        hideSideA={hideSideA}
        hideSideB={hideSideB}
      />
    </View>
  );
}
