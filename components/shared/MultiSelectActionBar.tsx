import { Href, RouteParamInput, useRouter } from "expo-router";
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
  type: ObjType;
  isMultiSelect: boolean;
  selectedIds: number[];
  onDeleteMany?: () => void;
  onTestMany?: (type?: ObjType) => void;
  href?: Href<ObjLinkProps | TestLinkProps>;
}

export default function MultiSelectActionBar({
  isMultiSelect,
  selectedIds,
  onDeleteMany,
  type,
  href,
  onTestMany,
}: MultiSelectActionBarProps) {
  const router = useRouter();
  const [buttons, setButtons] = useState<FABProps[]>([]);
  const [toggledButtons, setToggledButtons] = useState<FABProps[]>([]);

  useEffect(() => {
    setGeneralButtons();
  }, []);

  useEffect(() => {
    setMultiSelectButtons();
  }, [selectedIds]);

  const setGeneralButtons = () => {
    const list: FABProps[] = [];
    if (href) {
      list.push({
        icon: "plus",
        onPress: () => {
          router.push(href);
        },
      });
      list.push({
        icon: "test-tube",
        onPress: () => {
          router.push(getTestHref());
        },
      });
    }
    setButtons(list);
  };

  const setMultiSelectButtons = () => {
    const list: FABProps[] = [];

    list.push({
      icon: "test-tube",
    });

    if (onTestMany) {
      if (isTestVisible()) {
        list.push({
          icon: "test-tube",
          onPress: () => onTestMany(type),
        });
      } else {
        list.push({
          icon: "test-tube",
        });
      }
    }
    list.push({
      icon: "test-tube",
    });

    if (onDeleteMany) {
      list.push({
        icon: "trash-can-outline",
        onPress: onDeleteMany,
      });
    }

    setToggledButtons(list);
  };

  const isTestVisible = () => {
    if (type === ObjType.Card) {
      return selectedIds.length > 1;
    }
    return selectedIds.length > 0;
  };

  return (
    <ActionsBar
      buttons={buttons}
      toggle={isMultiSelect}
      toggledButtons={toggledButtons}
    />
  );
}
