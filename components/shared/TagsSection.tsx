import React from "react";
import { FlatList, StyleProp, View, ViewStyle } from "react-native";
import { IconButton, Card, Text } from "react-native-paper";
import { TagTile } from "../tags/TagTile";
import { Tag } from "@/types/Tag";
import { baseUnit, container, padding, text } from "@/constants/styles";
import TagsSectionDialog from "../card/TagsSectionDialog";

interface TagsSectionProps {
  title?: string;
  disabled?: boolean;
  tags?: Tag[];
  setTags: (tags: Tag[]) => void;
  removeTag: (tag: Tag) => void;
  style?: StyleProp<ViewStyle>;
}

const TagsSection = ({
  style,
  title,
  disabled,
  tags,
  setTags,
  removeTag,
}: TagsSectionProps) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getList = () => {
    if (!tags || tags.length === 0) {
      return <Text style={text.grayMessage}>No tags</Text>;
    }
    return (
      <FlatList
        horizontal={true}
        data={tags}
        keyExtractor={(tag) => tag.id.toString()}
        renderItem={({ item }) => (
          <TagTile
            disabledLink
            onClose={disabled ? undefined : () => removeTag(item)}
            tag={item}
          ></TagTile>
        )}
      />
    );
  };

  return (
    <View style={style}>
      <View style={[padding.base, container.flexXSpace]}>
        <Text variant="titleMedium">{title ? title : "Tags"}</Text>
        <IconButton
          disabled={disabled}
          icon="plus"
          size={baseUnit * 2}
          mode="contained-tonal"
          onPress={showDialog}
        ></IconButton>
      </View>

      <Card>
        <Card.Content>{getList()}</Card.Content>
      </Card>

      <TagsSectionDialog
        tagsLocal={tags}
        setTags={setTags}
        visible={visible}
        onDismiss={hideDialog}
      />
    </View>
  );
};

export default TagsSection;
