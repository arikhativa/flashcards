import { View } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";
import { container, gap, margin, padding } from "@/constants/styles";
import React from "react";

type CreateOrAddTagDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onAdd: () => void;
  onCreate: () => void;
};

export default function CreateOrAddTagDialog({
  visible,
  onDismiss,
  onAdd,
  onCreate,
}: CreateOrAddTagDialogProps) {
  return (
    <Portal>
      {visible && (
        <View style={container.fullScreen}>
          <Dialog dismissableBackButton visible={visible} onDismiss={onDismiss}>
            <Dialog.Title style={[padding.bottom4, { alignSelf: "center" }]}>
              Create or Add Tag
            </Dialog.Title>
            <Dialog.Actions
              style={[
                margin.x4,
                gap.base5,
                {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Button
                style={padding.x}
                mode="contained-tonal"
                onPress={() => {
                  onCreate();
                  onDismiss();
                }}
              >
                Create a new Tag
              </Button>
              <Button
                style={padding.x}
                mode="contained-tonal"
                onPress={() => {
                  onAdd();
                  onDismiss();
                }}
              >
                Add to an existing Tag
              </Button>
            </Dialog.Actions>
          </Dialog>
        </View>
      )}
    </Portal>
  );
}
