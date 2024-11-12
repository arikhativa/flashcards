import { Pressable, View } from "react-native";
import { Tag } from "@/types/Tag";
import { Chip } from "react-native-paper";
import { baseUnit, margin } from "@/constants/styles";
import { getTagHref } from "@/utils/links";
import { Link } from "expo-router";
import { GestureWrapper } from "./GestureWrapper";

export type TagTileProps = {
  tag: Tag;
  disabledLink?: boolean;
  showSize?: boolean;
  onClose?: () => void;
  onPress?: (id: number) => void;
  onLongPress?: (id: number) => void;
  isSelected?: boolean;
};

// TODO add option to chose an icon for the list?

export function TagTile({
  tag,
  showSize,
  onClose,
  disabledLink,
  onPress,
  onLongPress,
  isSelected,
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
    <GestureWrapper
      onTap={onPress && (() => onPress(tag.id))}
      onLongPress={onLongPress && (() => onLongPress(tag.id))}
    >
      <Link disabled={disabledLink} href={getTagHref(tag.id)} asChild>
        <Pressable>
          <View
            style={{
              padding: baseUnit,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Chip
              closeIcon={onClose ? "close" : undefined}
              onClose={onClose}
              selected={isSelected}
              style={[
                {
                  alignSelf: "flex-start",
                },
              ]}
            >
              {tag.name}
            </Chip>
            {getSumOfCards(tag)}
          </View>
        </Pressable>
      </Link>
    </GestureWrapper>
  );
}
