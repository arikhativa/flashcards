import { View } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { KnowledgeLevel, SelectedKL } from "../types/KnowledgeLevel";
import CheckboxText from "./CheckboxText";
import { container } from "@/constants/styles";

type MultiSelectKLDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  selectedKL: SelectedKL;
  onChange: (selectedKL: SelectedKL) => void;
};

export default function MultiSelectKLDialog({
  visible,
  onDismiss,
  selectedKL,
  onChange,
}: MultiSelectKLDialogProps) {
  const handleCheckboxChange = (key: keyof SelectedKL) => {
    return (checked: boolean) => {
      onChange({ ...selectedKL, [key]: checked });
    };
  };

  return (
    <Portal>
      {visible && (
        <View style={container.fullScreen}>
          <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Select Knowledge Level</Dialog.Title>
            <Dialog.Content>
              <CheckboxText
                label={KnowledgeLevel.Learning}
                checked={selectedKL.Learning}
                onCheckedChange={handleCheckboxChange(KnowledgeLevel.Learning)}
              />
              <CheckboxText
                label={KnowledgeLevel.GettingThere}
                checked={selectedKL.GettingThere}
                onCheckedChange={handleCheckboxChange(
                  KnowledgeLevel.GettingThere
                )}
              />
              <CheckboxText
                label={KnowledgeLevel.Confident}
                checked={selectedKL.Confident}
                onCheckedChange={handleCheckboxChange(KnowledgeLevel.Confident)}
              />
            </Dialog.Content>
          </Dialog>
        </View>
      )}
    </Portal>
  );
}
