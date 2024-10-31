import { FlatList, StyleSheet, Text, View } from "react-native";
import { Tag } from "@/types/Tag";
import { Chip } from "react-native-paper";
import { baseUnit } from "@/constants/styles";

export type TagTileProps = {
  tag: Tag;
};

// TODO add option to chose an icon for the list?

export function TagTile({ tag }: TagTileProps) {
  const getSumOfCards = (tag: Tag) => {
    if (!tag.cards.length) {
      return;
    }
    return (
      <Chip style={{ marginLeft: baseUnit }} disabled mode="outlined">
        {tag.cards.length}
      </Chip>
    );
  };

  return (
    <View style={{ padding: baseUnit, display: "flex", flexDirection: "row" }}>
      <Chip
        style={{
          alignSelf: "flex-start",
        }}
        onPress={() => console.log("Pressed")}
      >
        {tag.name}
      </Chip>
      {getSumOfCards(tag)}
    </View>
  );
}
