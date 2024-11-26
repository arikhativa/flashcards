import { TagTile } from "./TagTile";
import { Tag } from "@/types/Tag";
import { getTagHref } from "@/utils/links";
import { NEW_ID, ObjType } from "@/types/generic";
import { ManyTiles } from "../shared/ManyTiles";

export type TagsManyTilesProps = {
  isRootless?: boolean;
  onSelectMany?: () => void;
  isMultiSelect: boolean;
  selectedIds: number[];
  toggleIdSelection: (id: number) => void;
  clearSelectedIds: () => void;
  onDeleteMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  tags?: Tag[];
};

export function TagsManyTiles({
  isRootless,
  onSelectMany,
  isMultiSelect,
  selectedIds,
  toggleIdSelection,
  onDeleteMany,
  onTestMany,
  clearSelectedIds,
  tags,
}: TagsManyTilesProps) {
  const handleLongPress = (id: number) => {
    toggleIdSelection(id);
  };

  const handlePress = (id: number) => {
    if (isMultiSelect) {
      toggleIdSelection(id);
    }
    if (isRootless) {
      toggleIdSelection(id);
    }
  };

  const renderItem = ({ item }: { item: Tag }) => (
    <TagTile
      disabledLink={isMultiSelect || isRootless}
      isSelected={selectedIds.includes(item.id)}
      onLongPress={handleLongPress}
      onPress={handlePress}
      showSize
      tag={item}
    />
  );

  return (
    <ManyTiles
      isRootless={isRootless}
      isMultiSelect={isMultiSelect}
      selectedIds={selectedIds}
      onSelectMany={onSelectMany}
      clearSelectedIds={clearSelectedIds}
      onDeleteMany={onDeleteMany}
      onTestMany={onTestMany}
      objs={tags}
      renderItem={renderItem}
      noObjsMessage="No tags"
      contentContainerStyle={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
      href={getTagHref(NEW_ID)}
      type={ObjType.Tag}
    />
  );
}
