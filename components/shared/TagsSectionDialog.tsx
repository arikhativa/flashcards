import React from "react";
import { View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import Tags from "../tags/Tags";
import { useStore } from "@/providers/GlobalStore";
import { Tag } from "@/types/Tag";

interface TagsSectionDialogProps {
  onDismiss: () => void;
  addTags: (tags: Tag[]) => void;
  visible: boolean;
}

const TagsSectionDialog = ({
  visible,
  onDismiss,
  addTags,
}: TagsSectionDialogProps) => {
  const { tags, tagService } = useStore();
  // move useMultiSelect to here

  return (
    <Portal>
      {visible && (
        <View
          style={{
            flex: 1,
          }}
        >
          <Dialog
            style={{ flex: 1, overflow: "hidden" }}
            visible={visible}
            onDismiss={onDismiss}
          >
            <Tags isRootless tags={tags} tagService={tagService} />
          </Dialog>
        </View>
      )}
    </Portal>
  );
};

export default TagsSectionDialog;
