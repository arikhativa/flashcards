import { Card } from "@/types/Card";
import { Text } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { margin } from "@/constants/styles";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export type CardTileProps = {
  card: Card;
};

export function CardTile({ card }: CardTileProps) {
  return (
    <Link
      href={{
        pathname: "/card/[id]",
        params: { id: card.id },
      }}
      asChild
    >
      <Pressable>
        <PaperCard style={margin.base}>
          <PaperCard.Content>
            <Text variant="titleSmall">{card.sideA}</Text>
            <Divider></Divider>
            <Text variant="titleSmall">{card.sideB}</Text>
          </PaperCard.Content>
        </PaperCard>
      </Pressable>
    </Link>
  );
}
