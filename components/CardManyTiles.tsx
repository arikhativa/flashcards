import { Card } from "@/types/Card";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { CardTile } from "./CardTile";
import { text } from "@/constants/styles";

export type CardManyTilesProps = {
  cards?: Card[];
  disabledLink?: boolean;
  onClose?: (item: Card) => void;
};

export function CardManyTiles({
  cards,
  disabledLink,
  onClose,
}: CardManyTilesProps) {
  return (
    <View>
      {!cards || cards.length === 0 ? (
        <Text style={text.grayMessage}>No cards</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(card) => card.id.toString()}
          // TODO this 4 needs to be responsive
          numColumns={4}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <CardTile
              disabledLink={disabledLink}
              onClose={onClose ? () => onClose(item) : undefined}
              card={item}
            ></CardTile>
          )}
        />
      )}
    </View>
  );
}
