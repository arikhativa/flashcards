import { baseUnit } from "@/constants/styles";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { useState } from "react";
import { View } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import MultiSelectKLDialog from "./MultiSelectKLDialog";
import TimeDialog from "./TimeDialog";
import { TimeDropdown } from "@/hooks/useTimeDropdown";

interface FilterCardsProps {
  hide?: boolean;
  selectedKL?: SelectedKL;
  onKLChange?: (selectedKL: SelectedKL) => void;
  timeDropdown?: TimeDropdown;
}

export default function FilterCards({
  hide,
  selectedKL,
  onKLChange,
  timeDropdown,
}: FilterCardsProps) {
  const [visible, setVisible] = useState(true);
  const [timeDialogVisible, setTimeDialogVisible] = useState(false);
  const [isKLVisible, setIsKLVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        anchor={
          <IconButton
            mode="contained"
            size={baseUnit * 3}
            icon="filter"
            onPress={openMenu}
          />
        }
      >
        {timeDropdown && (
          <Menu.Item
            onPress={() => {
              closeMenu();
              setTimeDialogVisible(true);
            }}
            title="By Time Interval"
          />
        )}
        {selectedKL && onKLChange && (
          <Menu.Item
            onPress={() => {
              closeMenu();
              setIsKLVisible(true);
            }}
            title="By Knowledge Level"
          />
        )}
      </Menu>

      {timeDropdown && timeDialogVisible && (
        <TimeDialog
          timeDropdown={timeDropdown}
          visible={timeDialogVisible}
          onDismiss={() => setTimeDialogVisible(false)}
        />
      )}

      {selectedKL && onKLChange && (
        <MultiSelectKLDialog
          visible={isKLVisible}
          onDismiss={() => setIsKLVisible(false)}
          selectedKL={selectedKL}
          onChange={onKLChange}
        />
      )}
    </View>
  );
}
