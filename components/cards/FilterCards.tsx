import { baseUnit } from "@/constants/styles";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { useState } from "react";
import { View } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import MultiSelectKLDialog from "./MultiSelectKLDialog";
import { DatePickerModal } from "react-native-paper-dates";
import { TimeRange } from "@/types/generic";

interface FilterCardsProps {
  hide?: boolean;
  selectedKL?: SelectedKL;
  onKLChange?: (selectedKL: SelectedKL) => void;
  range?: TimeRange;
  onRangeChange?: (range: TimeRange) => void;
}

export default function FilterCards({
  hide,
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
        {range && onRangeChange && (
          <Menu.Item
            onPress={() => {
              closeMenu();
              setTimeRangeVisible(true);
            }}
            title="By Time Intervale"
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

      {range && onRangeChange && (
        <DatePickerModal
          locale="en"
          mode="range"
          visible={timeRangeVisible}
          onDismiss={() => {
            setTimeRangeVisible(false);
          }}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={(newRange: TimeRange) => {
            onRangeChange(newRange);
            setTimeRangeVisible(false);
          }}
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
