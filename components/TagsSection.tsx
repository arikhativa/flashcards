import React from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Dialog, IconButton, Card, Portal, Text } from "react-native-paper";
import { TagTile } from "./TagTile";
import { Tag } from "@/types/Tag";
import Autocomplete from "./Autocomplete";
import { baseUnit, container, margin, padding, text } from "@/constants/styles";
import { useStore } from "@/providers/GlobalStore";

interface TagsSectionProps {
  title?: string;
  disabled?: boolean;
  allTags: Tag[];
  tags?: Tag[];
  addTag: (tag: Tag) => void;
  removeTag: (tag: Tag) => void;
  style?: StyleProp<ViewStyle>;
}

const TagsSection = ({
  style,
  title,
  disabled,
  tags,
  allTags,
  addTag,
  removeTag,
}: TagsSectionProps) => {
  const { tagService } = useStore();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const keyExtractor = (tag: Tag): string => tag.id.toString();

  const onSelect = (tag: Tag) => {
    addTag(tag);
  };

  const onSearchChange = (query: string): Tag[] => {
    if (!query) {
      return [];
    }

    return allTags
      .filter((tag) => tag.name.toLowerCase().includes(query.toLowerCase()))
      .filter((tag) => !tags?.find((t) => t.id === tag.id));
  };

  const handleCreateTag = async (name: string): Promise<void> => {
    const tag = await tagService.create({ name });
    if (tag) addTag(tag);
  };

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

      <Portal>
        {visible && (
          <View style={styles.viewContainer}>
            <Dialog
              style={[styles.dialogContainer]}
              visible={visible}
              onDismiss={hideDialog}
            >
              <Dialog.Title>Search for Tags</Dialog.Title>
              <IconButton
                style={container.buttonTopRight}
                icon="close"
                size={baseUnit * 2}
                onPress={hideDialog}
              ></IconButton>
              <Dialog.Content>
                <Autocomplete
                  onSelect={onSelect}
                  keyExtractor={keyExtractor}
                  onSearchChange={onSearchChange}
                  itemComponent={({ item }) => (
                    <TagTile disabledLink tag={item}></TagTile>
                  )}
                  onCreateEmpty={(text: string) => {
                    hideDialog();
                    return handleCreateTag(text);
                  }}
                />
              </Dialog.Content>
            </Dialog>
          </View>
        )}
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  dialogContainer: {
    position: "absolute",
    backgroundColor: "white", // TODO bad color use the one in stye or them
    width: "90%",
    top: 0,
    alignSelf: "center",
  },
});

export default TagsSection;
