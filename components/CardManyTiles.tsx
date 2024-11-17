import { Card } from "@/types/Card";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { CardTile } from "./CardTile";
import { container, text } from "@/constants/styles";

export type CardManyTilesProps = {
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  cards?: Card[];
  disabledLink?: boolean;
  onClose?: (item: Card) => void;
};

export function CardManyTiles({
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  cards,
  disabledLink,
  onClose,
}: CardManyTilesProps) {
  const handleLongPress = (id: number) => {
    toggleIdSelection(id);
  };

  const handlePress = (id: number) => {
    if (isMultiSelect) {
      toggleIdSelection(id);
    }
  };

  return (
    <View>
      {!cards || cards.length === 0 ? (
        // TODO this needs to be responsive
        <View style={[]}>
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
              disabledLink={isMultiSelect ? true : disabledLink}
              onClose={onClose ? () => onClose(item) : undefined}
              card={item}
              onLongPress={handleLongPress}
              onPress={handlePress}
              isSelected={selectedIds.includes(item.id)}
            ></CardTile>
          )}
        />
      )}
    </View>
  );
}
