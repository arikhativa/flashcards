import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { container, text } from "@/constants/styles";
import { GestureWrapper } from "../shared/GestureWrapper";
import { TagTile } from "./TagTile";
import { Tag } from "@/types/Tag";

export type TagsManyTilesProps = {
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  tags?: Tag[];
  disabledLink?: boolean;
};

export function TagsManyTiles({
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  clearSelectedIds,
  tags,
  disabledLink,
}: TagsManyTilesProps) {
  const handleLongPress = (id: number) => {
    toggleIdSelection(id);
  };

  const handlePress = (id: number) => {
    if (isMultiSelect) {
      toggleIdSelection(id);
    }
  };

  return (
    <GestureWrapper onTap={clearSelectedIds} enabled={isMultiSelect}>
      <View style={{ flex: 1 }}>
        {!tags || tags.length === 0 ? (
          // TODO this needs to be responsive
          <View style={[container.center]}>
            <Text style={text.grayMessage}>No tags</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            data={tags}
            keyExtractor={(tag) => tag.id.toString()}
            renderItem={({ item }) => (
              <TagTile
                disabledLink={isMultiSelect}
                isSelected={selectedIds.includes(item.id)}
                onLongPress={handleLongPress}
                onPress={handlePress}
                showSize
                tag={item}
              />
            )}
          />
        )}
      </View>
    </GestureWrapper>
  );
}
