import { View } from "react-native";

import { useStore } from "@/providers/GlobalStore";
import { container, margin } from "@/constants/styles";
import { getTagHref } from "@/utils/links";
import { NEW_ID } from "../[objType]";
import { useEffect, useState } from "react";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import MultiSelectActionBar from "@/components/shared/MultiSelectActionBar";
import { ObjType } from "@/types/generic";
import ListActions from "@/components/shared/ListActions";
import { TagsManyTiles } from "@/components/tags/TagsManyTiles";

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
      <ListActions query={query} onQueryChange={setQuery} />

      <TagsManyTiles
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        toggleIdSelection={toggleIdSelection}
        clearSelectedIds={clearSelectedIds}
        tags={tagsLocal}
        disabledLink={isMultiSelect}
      />
      <MultiSelectActionBar
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        onDeleteMany={handelDeleteMany}
        type={ObjType.Tag}
        onTestMany={handelTestMany}
        href={getTagHref(NEW_ID)}
      />
    </View>
  );
}
