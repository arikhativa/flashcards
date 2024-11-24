import { View } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";
import { container, gap, margin, padding } from "@/constants/styles";
import React from "react";

type ConfirmationDialogProps = {
  visible: boolean;
  title: string;
  approveText: string;
  cancelText: string;
  onDismiss: () => void;
  onCancel: () => void;
  onApprove: () => void;
};

export default function ConfirmationDialog({
  visible,
  title,
  approveText,
  cancelText,
  onDismiss,
  onApprove,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <Portal>
      {visible && (
        <View style={container.fullScreen}>
          <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title style={[padding.bottom4, { alignSelf: "center" }]}>
              {title}
            </Dialog.Title>
            <Dialog.Actions
              style={[margin.x4, { justifyContent: "space-between" }]}
            >
              <Button
                mode="contained"
                onPress={() => {
                  onApprove();
                  onDismiss();
                }}
              >
                {approveText}
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  onCancel();
                  onDismiss();
                }}
              >
                {cancelText}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </View>
      )}
    </Portal>
  );
}
