import { View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { container } from "@/constants/styles";
import { TimeDropdown } from "@/hooks/useTimeDropdown";
import { Dropdown } from "react-native-paper-dropdown";
import React from "react";
import { TIME_OPTIONS } from "@/utils/testForm";

type TimeDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  timeDropdown: TimeDropdown;
};

export default function TimeDialog({
  visible,
  onDismiss,
  timeDropdown,
}: TimeDialogProps) {
  return (
    <Portal>
      {visible && (
        <View style={container.fullScreen}>
          <Dialog dismissableBackButton visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Select Time</Dialog.Title>
            <Dialog.Content>
              <Dropdown
                label="Cards from"
                options={TIME_OPTIONS}
                value={timeDropdown.timeSelected}
                onSelect={timeDropdown.setTimeSelectedWrapper}
              />
            </Dialog.Content>
          </Dialog>
        </View>
      )}
    </Portal>
  );
}
