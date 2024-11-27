import React, { useEffect } from "react";
import { View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import Tags from "../tags/Tags";
import { useStore } from "@/providers/GlobalStore";
import { Tag } from "@/types/Tag";
import { useMultiSelect } from "@/hooks/useMultiSelect";

interface TagsSectionDialogProps {
  onDismiss: () => void;
  setTags: (tags: Tag[]) => void;
  visible: boolean;
  tagsLocal?: Tag[];
}

const TagsSectionDialog = ({
  tagsLocal,
  visible,
  onDismiss,
  setTags,
}: TagsSectionDialogProps) => {
  const { tags, conf, tagService } = useStore();
  const multiSelect = useMultiSelect();

  useEffect(() => {
    if (tagsLocal) {
      multiSelect.setSelectedIds(tagsLocal.map((t) => t.id));
    }
  }, [tagsLocal]);

  const handleSelectMany = () => {
    const tagList: Tag[] = multiSelect.selectedIdsRef.current.map((id) =>
      tags.find((t) => t.id === id)
    ) as Tag[];

    multiSelect.clearSelectedIds();
    setTags(tagList);
    onDismiss();
  };

  return (
    <Portal>
      {visible && (
        <View
          style={{
            flex: 1,
          }}
        >
          <Dialog
            dismissableBackButton
            style={{ flex: 1, overflow: "hidden" }}
            visible={visible}
            onDismiss={onDismiss}
          >
            <Tags
              conf={conf}
              isRootless
              onSelectMany={handleSelectMany}
              tags={tags}
              tagService={tagService}
              multiSelect={multiSelect}
            />
          </Dialog>
        </View>
      )}
    </Portal>
  );
};

export default TagsSectionDialog;
