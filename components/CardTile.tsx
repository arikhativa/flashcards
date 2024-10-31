import { Card } from "@/types/Card";
import { Text } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { baseUnit } from "@/constants/styles";
export type CardTileProps = {
  sideA: string;
  sideB: string;
  card: Card;
};

export function CardTile({ card }: CardTileProps) {
  return (
    <PaperCard style={{ margin: baseUnit }}>
      <PaperCard.Content>
        <Text variant="titleSmall">{card.sideA}</Text>
        <Divider></Divider>
        <Text variant="titleSmall">{card.sideB}</Text>
      </PaperCard.Content>
    </PaperCard>
  );
}
