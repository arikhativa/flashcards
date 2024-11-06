import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Card as PaperCard,
  Portal,
  Text,
} from "react-native-paper";
import { TagTile } from "./TagTile";
import { Tag } from "@/types/Tag";
import Autocomplete from "./Autocomplete";
import { margin, padding } from "@/constants/styles";

interface TagsSectionProps {
  allTags: Tag[];
  tags: Tag[];
  addTag: (tag: Tag) => void;
}

const TagsSection = ({ tags, allTags, addTag }: TagsSectionProps) => {
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
      .filter((tag) => !tags.find((t) => t.id === tag.id));
  };

  return (
    <View style={[margin.base2]}>
      <Text style={padding.bottom} variant="titleMedium">
        Tags
      </Text>
      <PaperCard>
        <PaperCard.Content>
          <Portal>
            {visible && (
              <View style={styles.viewContainer}>
                <Dialog
                  style={[styles.dialogContainer, margin.base]}
                  visible={visible}
                  onDismiss={hideDialog}
                >
                  <Dialog.Title>Search for Tags</Dialog.Title>
                  <Dialog.Content>
                    <Autocomplete
                      onSelect={onSelect}
                      keyExtractor={keyExtractor}
                      onSearchChange={onSearchChange}
                      itemComponent={({ item }) => (
                        <TagTile tag={item}></TagTile>
                      )}
                    />
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                  </Dialog.Actions>
                </Dialog>
              </View>
            )}
          </Portal>

          <Dialog.Actions>
            <Button onPress={showDialog}>Add Tags</Button>
          </Dialog.Actions>

          <FlatList
            horizontal={true}
            data={tags}
            keyExtractor={(tag) => tag.id.toString()}
            renderItem={({ item }) => <TagTile tag={item}></TagTile>}
          />
        </PaperCard.Content>
      </PaperCard>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  dialogContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: "90%",
    top: 0,
    alignSelf: "center",
  },
});

export default TagsSection;
