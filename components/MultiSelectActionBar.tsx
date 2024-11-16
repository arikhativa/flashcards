import { container, margin } from "@/constants/styles";
import { View } from "react-native";
import { FAB } from "react-native-paper";
import { Href, Link } from "expo-router";
import { getTestHref, ObjLinkProps, TestLinkProps } from "@/utils/links";
import { useEffect, useState } from "react";
import ActionsBar from "./ActionsBar";

interface FABProps {
  icon: string;
  onPress?: () => void;
  href?: Href<ObjLinkProps | TestLinkProps>;
}

interface MultiSelectActionBarProps {
  isMultiSelect: boolean;
  selectedIds: number[];
  onDeselectAll: () => void;
  deleteMany?: (list: number[]) => void;
  href?: Href<ObjLinkProps | TestLinkProps>;
  testMany?: () => void;
}

export default function MultiSelectActionBar({
  isMultiSelect,
  selectedIds,
  onDeselectAll,
  deleteMany,
  href,
  testMany,
}: MultiSelectActionBarProps) {
  const [buttons, setButtons] = useState<FABProps[]>([]);
  const [toggledButtons, setToggledButtons] = useState<FABProps[]>([]);

  useEffect(() => {
    const setMultiSelectButtons = () => {
      const list: FABProps[] = [];

      if (testMany) {
        list.push({
          icon: "test-tube",
          onPress: testMany,
        });
      }

      list.push({
        icon: "arrow-left",
        onPress: onDeselectAll,
      });

      if (deleteMany) {
        list.push({
          icon: "trash-can-outline",
          onPress: () => deleteMany(selectedIds),
        });
      }

      setToggledButtons(list);
    };

    setMultiSelectButtons();

    if (href) {
      setButtons([
        {
          icon: "plus",
          href: href,
        },
        {
          icon: "test-tube",
          href: getTestHref(),
        },
      ]);
    }
  }, [selectedIds]);

  return (
    <ActionsBar
      buttons={buttons}
      toggle={isMultiSelect}
      toggledButtons={toggledButtons}
    />
  );
}
