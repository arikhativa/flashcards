import { FAB, Text } from "react-native-paper";
import { View, FlatList } from "react-native";

import { TagTile } from "@/components/TagTile";
import { useStore } from "@/providers/GlobalStore";
import { container, margin, text } from "@/constants/styles";
import { Link } from "expo-router";
import { getTagHref } from "@/utils/links";
import { NEW_ID } from "../[objType]";
import TagsActions from "@/components/TagsActions";
import { useEffect, useState } from "react";
import { useMultiSelect } from "@/hooks/useMultiSelect";

export default function TagsScreen() {
  const { tags } = useStore();
  const [tagsLocal, setTagsLocal] = useState(tags);
  const [query, setQuery] = useState("");
  const { isMultiSelect, selectedIds, toggleIdSelection, clearSelectedIds } =
    useMultiSelect();

  useEffect(() => {
    setTagsLocal(
      tags.filter((e) =>
        e.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    );
  }, [tags, query]);

  const handleLongPress = (id: number) => {
    toggleIdSelection(id);
  };

  const handlePress = (id: number) => {
    if (isMultiSelect) {
      toggleIdSelection(id);
    }
  };

  return (
    <View style={[container.flex1, margin.top2]}>
      <TagsActions query={query} onQueryChange={setQuery} />
      {!tagsLocal || tagsLocal.length === 0 ? (
        <View style={container.center}>
          <Text style={text.grayMessage}>No tags</Text>
        </View>
      ) : (
        <View style={[{ maxHeight: 400 }]}>
          <FlatList
            data={tagsLocal}
            keyExtractor={(tag) => tag.id.toString()}
            renderItem={({ item }) => (
              <TagTile
                disabledLink={isMultiSelect}
                isSelected={selectedIds.includes(item.id)}
                onLongPress={handleLongPress}
                onPress={handlePress}
                showSize
                tag={item}
              ></TagTile>
            )}
          />
        </View>
      )}
      <Link
        style={container.buttonBottomRight}
        href={getTagHref(NEW_ID)}
        asChild
      >
        <FAB icon="plus" />
      </Link>
    </View>
  );
}
