import { Text } from "react-native-paper";
import { View, FlatList } from "react-native";

import { TagTile } from "@/components/tags/TagTile";
import { useStore } from "@/providers/GlobalStore";
import { container, margin, text } from "@/constants/styles";
import { getTagHref } from "@/utils/links";
import { NEW_ID } from "../[objType]";
import TagsActions from "@/components/tags/TagsActions";
import { useEffect, useState } from "react";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import MultiSelectActionBar from "@/components/shared/MultiSelectActionBar";
import { ObjType } from "@/types/generic";

export default function TagsScreen() {
  const { tags, tagService } = useStore();
  const [tagsLocal, setTagsLocal] = useState(tags);
  const [query, setQuery] = useState("");
  const {
    isMultiSelect,
    selectedIdsRef,
    selectedIds,
    toggleIdSelection,
    clearSelectedIds,
    handelTestMany,
  } = useMultiSelect();

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

  const handelDeleteMany = async () => {
    const ret = await tagService.deleteMany(selectedIdsRef.current);
    clearSelectedIds();
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
      <MultiSelectActionBar
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        onDeselectAll={clearSelectedIds}
        onDeleteMany={handelDeleteMany}
        type={ObjType.Tag}
        onTestMany={handelTestMany}
        href={getTagHref(NEW_ID)}
      />
    </View>
  );
}
