import { baseUnit } from "@/constants/styles";
import { useState } from "react";
import { View } from "react-native";
import { Menu, IconButton, Divider, useTheme } from "react-native-paper";
import { Sort, SortDir, SortNames } from "@/types/generic";
import { useStore } from "@/providers/GlobalStore";

interface SortCardsProps {
  sort: Sort;
  onSortChange: (sort: Sort) => void;
}

export default function SortCards({ sort, onSortChange }: SortCardsProps) {
  const theme = useTheme();
  const { conf } = useStore();
  const [visible, setVisible] = useState(true);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const swapDirection = () => {
    const newDirection =
      sort.direction === SortDir.ASC ? SortDir.DESC : SortDir.ASC;
    onSortChange({
      ...sort,
      direction: newDirection,
    });
  };

  const byCreationTime = () => {
    onSortChange({
      ...sort,
      field: SortNames.TIME,
    });
  };

  const byKL = () => {
    onSortChange({
      ...sort,
      field: SortNames.KL,
    });
  };

  const bySideA = () => {
    onSortChange({
      ...sort,
      field: SortNames.SIDE_A_ABC,
    });
  };

  const bySideB = () => {
    onSortChange({
      ...sort,
      field: SortNames.SIDE_B_ABC,
    });
  };

  const getStyle = (s: SortNames) => {
    if (sort.field === s) {
      return { backgroundColor: theme.colors.primaryContainer };
    }
    return {};
  };

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
            icon="sort"
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          style={getStyle(SortNames.TIME)}
          onPress={() => {
            closeMenu();
            byCreationTime();
          }}
          title="Creation Time"
        />
        <Menu.Item
          style={getStyle(SortNames.KL)}
          onPress={() => {
            closeMenu();
            byKL();
          }}
          title="Knowledge Level"
        />
        <Menu.Item
          style={[getStyle(SortNames.SIDE_A_ABC)]}
          onPress={() => {
            closeMenu();
            bySideA();
          }}
          title={`Alphabetical ${conf.sideA}`}
        />
        <Menu.Item
          style={getStyle(SortNames.SIDE_B_ABC)}
          onPress={() => {
            closeMenu();
            bySideB();
          }}
          title={`Alphabetical ${conf.sideB}`}
        />
        <Divider />
        <Menu.Item
          contentStyle={{
            marginRight: baseUnit * 2,
          }}
          trailingIcon={
            sort.direction === SortDir.ASC ? "arrow-up" : "arrow-down"
          }
          onPress={() => {
            closeMenu();
            swapDirection();
          }}
          title="Swap Direction"
        />
      </Menu>
    </View>
  );
}
