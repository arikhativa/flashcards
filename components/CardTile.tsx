import { Card } from "@/types/Card";
import { Chip, IconButton, Text } from "react-native-paper";
import { Card as PaperCard } from "react-native-paper";
import { Divider } from "react-native-paper";
import { color, container, margin } from "@/constants/styles";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { getCardHref } from "@/utils/links";

export type CardTileProps = {
  card: Card;
  disabledLink?: boolean;
  onClose?: () => void;
};

export function CardTile({ card, disabledLink, onClose }: CardTileProps) {
  return (
    <Link disabled={disabledLink} href={getCardHref(card.id)} asChild>
      <Pressable>
        <View>
          {onClose && (
            <IconButton
              style={{
                padding: 0,
                position: "absolute",
                top: -5,
                right: -10,
                zIndex: 5,
              }}
              icon="close"
              size={15}
              mode="contained"
              onPress={onClose}
            ></IconButton>
          )}

          <PaperCard style={margin.base}>
            <PaperCard.Content>
              <Text variant="titleSmall">{card.sideA}</Text>
              <Divider></Divider>
              <Text variant="titleSmall">{card.sideB}</Text>
            </PaperCard.Content>
          </PaperCard>
        </View>
      </Pressable>
    </Link>
  );
}
