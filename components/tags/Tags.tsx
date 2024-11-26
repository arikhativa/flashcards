import { View } from "react-native";

import { container } from "@/constants/styles";
import { useEffect, useState } from "react";
import { MultiSelect } from "@/hooks/useMultiSelect";
import ListActions from "@/components/shared/ListActions";
import { TagsManyTiles } from "@/components/tags/TagsManyTiles";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import { useVisible } from "@/hooks/useVisible";
import { Tag } from "@/types/Tag";
import { TagService } from "@/services/Tag";

interface TagsProps {
  isRootless?: boolean;
  tags: Tag[];
  tagService: TagService;
  multiSelect: MultiSelect;
  onSelectMany?: () => void;
}

export default function Tags({
  isRootless,
  tags,
  tagService,
  onSelectMany,
  multiSelect,
}: TagsProps) {
  const [tagsLocal, setTagsLocal] = useState(tags);
  const [query, setQuery] = useState("");
  const {
    isMultiSelect,
    selectedIdsRef,
    selectedIds,
    toggleIdSelection,
    clearSelectedIds,
    handelTestMany,
  } = multiSelect;

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
    <View style={[container.flex1]}>
      <ListActions query={query} onQueryChange={setQuery} />

      <TagsManyTiles
        isRootless={isRootless}
        onSelectMany={onSelectMany}
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