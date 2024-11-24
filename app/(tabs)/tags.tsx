import { View } from "react-native";

import { useStore } from "@/providers/GlobalStore";
import { container, margin } from "@/constants/styles";
import { useEffect, useState } from "react";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import ListActions from "@/components/shared/ListActions";
import { TagsManyTiles } from "@/components/tags/TagsManyTiles";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { useVisible } from "@/hooks/useVisible";

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

  const { visible, toggleVisible } = useVisible();

  useEffect(() => {
    setTagsLocal(
      tags.filter((e) =>
        e.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    );
  }, [tags, query]);

  const handelDeleteMany = async () => {
    const ret = await tagService.deleteMany(selectedIdsRef.current);
    clearSelectedIds();
  };

  return (
    <View style={[container.flex1, margin.top2]}>
      <ListActions query={query} onQueryChange={setQuery} />

      <TagsManyTiles
        onDeleteMany={toggleVisible}
        onTestMany={handelTestMany}
        isMultiSelect={isMultiSelect}
        selectedIds={selectedIds}
        toggleIdSelection={toggleIdSelection}
        clearSelectedIds={clearSelectedIds}
        tags={tagsLocal}
      />

      <ConfirmationDialog
        visible={visible}
        onDismiss={toggleVisible}
        title="Delete Selected Tags?"
        approveText="Delete"
        cancelText="Cancel"
        onCancel={toggleVisible}
        onApprove={handelDeleteMany}
      />
    </View>
  );
}
