import { Href, RouteParamInput, useRouter } from "expo-router";
import { getTestHref, ObjLinkProps, TestLinkProps } from "@/utils/links";
import { useEffect, useState } from "react";
import ActionsBar, { DangerButtons, MainButtons } from "./ActionsBar";
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
  const [buttons, setButtons] = useState<MainButtons>({});
  const [toggledButtons, setToggledButtons] = useState<MainButtons>({});
  const [toggledDangerButtons, setToggledDangerButtons] =
    useState<DangerButtons>({});

  useEffect(() => {
    setGeneralButtons();
  }, []);

  useEffect(() => {
    setMultiSelectButtons();
  }, [selectedIds]);

  const setGeneralButtons = () => {
    if (href) {
      setButtons({
        a: {
          icon: "plus",
          onPress: () => {
            router.push(href);
          },
        },
        b: {
          icon: "test-tube",
          onPress: () => {
            router.push(getTestHref());
          },
        },
      });
    }
  };

  const setMultiSelectButtons = () => {
    let testMany: FABProps | undefined = undefined;
    let deleteMany: FABProps | undefined = undefined;

    if (onTestMany && isTestVisible()) {
      testMany = { icon: "test-tube", onPress: () => onTestMany(type) };
    }

    if (onDeleteMany) {
      deleteMany = {
        icon: "trash-can-outline",
        onPress: onDeleteMany,
      };
    }

    setToggledButtons({
      b: testMany,
    });

    setToggledDangerButtons({
      a: deleteMany,
    });
  };

  const isTestVisible = () => {
    if (type === ObjType.Card) {
      return selectedIds.length > 1;
    }
    return selectedIds.length > 0;
  };

  return (
    <ActionsBar
      marginTop={200}
      buttons={buttons}
      toggle={isMultiSelect}
      toggledButtons={toggledButtons}
      toggledDangerButtons={toggledDangerButtons}
    />
  );
}
