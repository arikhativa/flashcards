import { View } from "react-native";
import { Tag } from "@/types/Tag";
import { Chip } from "react-native-paper";
import { baseUnit, margin } from "@/constants/styles";

export type TagTileProps = {
  tag: Tag;
  showSize?: boolean;
  onClose?: () => void;
};

// TODO add option to chose an icon for the list?

export function TagTile({ tag, showSize, onClose }: TagTileProps) {
  const getSumOfCards = (tag: Tag) => {
    if (!showSize || !tag.cards.length) {
      return;
    }
    return (
      <Chip style={margin.left} disabled mode="outlined">
        {tag.cards.length}
      </Chip>
    );
  };

  return (
    <View style={{ padding: baseUnit, display: "flex", flexDirection: "row" }}>
      <Chip
        closeIcon={onClose ? "close" : undefined}
        onClose={onClose}
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
