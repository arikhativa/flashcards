import { Card } from "@/types/Card";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { CardTile } from "./CardTile";
import { container, text } from "@/constants/styles";
import { useState } from "react";

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
  const [isAnySelected, setIsAnySelected] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);

  const handleLongPress = (id: number) => {
    setIsAnySelected(true);
    setSelectedTiles([...selectedTiles, id]);
  };

  const handlePress = (id: number) => {
    if (isAnySelected) {
      if (selectedTiles.find((tileId) => tileId === id)) {
        setSelectedTiles([...selectedTiles.filter((tileId) => tileId !== id)]);
        if (selectedTiles.length === 1) {
          setIsAnySelected(false);
        }
      } else {
        setSelectedTiles([...selectedTiles, id]);
      }
    }
  };

  return (
    <View>
      {!cards || cards.length === 0 ? (
        <View style={container.center}>
          <Text style={text.grayMessage}>No cards</Text>
        </View>
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
              disabledLink={isAnySelected ? true : disabledLink}
              onClose={onClose ? () => onClose(item) : undefined}
              card={item}
              onLongPress={handleLongPress}
              onPress={handlePress}
              isSelected={selectedTiles.includes(item.id)}
            ></CardTile>
          )}
        />
      )}
    </View>
  );
}
