import { Href, RouteParamInput } from "expo-router";
import { getTestHref, ObjLinkProps, TestLinkProps } from "@/utils/links";
import { useEffect, useState } from "react";
import ActionsBar from "./ActionsBar";
import { ObjType } from "@/types/generic";

interface FABProps {
  icon: string;
  onPress?: () => void;
  href?: Href<RouteParamInput<ObjLinkProps | TestLinkProps>>;
}

interface MultiSelectActionBarProps {
  type?: ObjType;
  isMultiSelect: boolean;
  selectedIds: number[];
  onDeselectAll: () => void;
  deleteMany?: (list: number[]) => void;
  href?: Href<ObjLinkProps | TestLinkProps>;
  testMany?: (list: number[], type?: ObjType) => void;
}

export default function MultiSelectActionBar({
  isMultiSelect,
  selectedIds,
  onDeselectAll,
  deleteMany,
  type,
  href,
  testMany,
}: MultiSelectActionBarProps) {
  const [buttons, setButtons] = useState<FABProps[]>([]);
  const [toggledButtons, setToggledButtons] = useState<FABProps[]>([]);

  // TODO fix this showTestManyButton it is not claern when we have a test tube
  const showTestManyButton = (): boolean => {
    if (type === ObjType.Card) {
      return !!testMany && selectedIds.length > 1;
    }
    return !!testMany && selectedIds.length > 0;
  };

  useEffect(() => {
    const setMultiSelectButtons = () => {
      const list: FABProps[] = [];

      if (showTestManyButton()) {
        list.push({
          icon: "test-tube",
          onPress: testMany ? () => testMany(selectedIds, type) : undefined,
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
