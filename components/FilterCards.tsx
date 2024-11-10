import { baseUnit } from "@/constants/styles";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { useState, type PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Menu, PaperProvider, Button, IconButton } from "react-native-paper";
import MultiSelectKLDialog from "./MultiSelectKLDialog";
import { DatePickerModal } from "react-native-paper-dates";
import { TimeRange } from "@/types/generic";

interface FilterCardsProps {
  selectedKL: SelectedKL;
  onKLChange: (selectedKL: SelectedKL) => void;
  range: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  // onArchiveChange: (showArchive: boolean) => void;
}

export default function FilterCards({
  selectedKL,
  onKLChange,
  range,
  onRangeChange,
}: FilterCardsProps) {
  const [visible, setVisible] = useState(true);
  const [timeRangeVisible, setTimeRangeVisible] = useState(false);
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
        <Menu.Item
          onPress={() => {
            closeMenu();
            setTimeRangeVisible(true);
          }}
          title="By Time Intervale"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            setIsKLVisible(true);
          }}
          title="By Knowledge Level"
        />
        <Menu.Item onPress={() => {}} title="Show archive" />
      </Menu>

      <DatePickerModal
        locale="en"
        mode="range"
        visible={timeRangeVisible}
        onDismiss={() => {
          onRangeChange({ startDate: undefined, endDate: undefined });
          setTimeRangeVisible(false);
        }}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={(newRange: TimeRange) => {
          onRangeChange(newRange);
          setTimeRangeVisible(false);
        }}
      />

      <MultiSelectKLDialog
        visible={isKLVisible}
        onDismiss={() => setIsKLVisible(false)}
        selectedKL={selectedKL}
        onChange={onKLChange}
      />
    </View>
  );
}
