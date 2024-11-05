import React, { useState } from "react";
import { FlatList } from "react-native";
import { Card as PaperCard, Text } from "react-native-paper";
import { TagTile } from "./TagTile";
import { Tag } from "@/types/Tag";
import AutocompleteSearchbar from "./AutocompleteSearchbar";

interface TagsSectionProps {
  allTags: Tag[];
  tags: Tag[];
}

const TagsSection = ({ tags, allTags }: TagsSectionProps) => {
  const keyExtractor = (tag: Tag): string => tag.id.toString();
  const toStringItem = (tag: Tag): string => tag.name;

  const onSelect = (tag: Tag) => {
    console.log("tag", tag); // TODO
  };

  const onSearchChange = (query: string): Tag[] => {
    return allTags.filter((tag) =>
      tag.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <PaperCard>
      <PaperCard.Content>
        <Text variant="titleMedium">Tags</Text>
        <AutocompleteSearchbar
          onSelect={onSelect}
          toStringItem={toStringItem}
          keyExtractor={keyExtractor}
          onSearchChange={onSearchChange}
        />
        <FlatList
          horizontal={true}
          data={tags}
          keyExtractor={(tag) => tag.id.toString()}
          renderItem={({ item }) => <TagTile tag={item}></TagTile>}
        />
      </PaperCard.Content>
    </PaperCard>
  );
};

export default TagsSection;
