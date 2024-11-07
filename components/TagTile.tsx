import { Pressable, View } from "react-native";
import { Tag } from "@/types/Tag";
import { Chip } from "react-native-paper";
import { baseUnit, margin } from "@/constants/styles";
import { getTagHref } from "@/utils/links";
import { Link } from "expo-router";

export type TagTileProps = {
  tag: Tag;
  disabledLink?: boolean;
  showSize?: boolean;
  onClose?: () => void;
};

// TODO add option to chose an icon for the list?

export function TagTile({
  tag,
  showSize,
  onClose,
  disabledLink,
}: TagTileProps) {
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
    <Link disabled={disabledLink} href={getTagHref(tag.id)} asChild>
      <Pressable>
        <View
          style={{ padding: baseUnit, display: "flex", flexDirection: "row" }}
        >
          <Chip
            closeIcon={onClose ? "close" : undefined}
            onClose={onClose}
            style={{
              alignSelf: "flex-start",
            }}
          >
            {tag.name}
          </Chip>
          {getSumOfCards(tag)}
        </View>
      </Pressable>
    </Link>
  );
}
