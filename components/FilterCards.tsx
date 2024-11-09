import { baseUnit } from "@/constants/styles";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { useState, type PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Menu, PaperProvider, Button, IconButton } from "react-native-paper";
import MultiSelectKLDialog from "./MultiSelectKLDialog";

interface FilterCardsProps {
  selectedKL: SelectedKL;
  onKLChange: (selectedKL: SelectedKL) => void;
  // onTimeChange: (from: Date, to: Date) => void;
  // onArchiveChange: (showArchive: boolean) => void;
}

export default function FilterCards({
  selectedKL,
  onKLChange,
}: FilterCardsProps) {
  const [visible, setVisible] = useState(true);
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
        <Menu.Item onPress={() => {}} title="By Time Intervale" />
        <Menu.Item
          onPress={() => {
            closeMenu();
            setIsKLVisible(true);
          }}
          title="By Knowledge Level"
        />
        <Menu.Item onPress={() => {}} title="Show archive" />
      </Menu>
      <MultiSelectKLDialog
        visible={isKLVisible}
        onDismiss={() => setIsKLVisible(false)}
        selectedKL={selectedKL}
        onChange={onKLChange}
      />
    </View>
  );
}
