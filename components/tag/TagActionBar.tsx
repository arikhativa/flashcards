import { useEffect } from "react";
import ActionsBar, { FABProps } from "../shared/ActionsBar";
import { useActionBar } from "@/hooks/useActionBar";

interface TagActionBarProps {
  isMultiSelect: boolean;
  selectedIds: number[];
  onTestMany: () => void;
  onRemoveCardsFromTag: () => void;
}

export default function TagActionBar({
  isMultiSelect,
  selectedIds,
  onTestMany,
  onRemoveCardsFromTag,
}: TagActionBarProps) {
  const { buttons, toggledButtons, setToggledButtons } = useActionBar();

  useEffect(() => {
    setMultiSelectButtons();
  }, [selectedIds]);

  const setMultiSelectButtons = () => {
    const list: FABProps[] = [];

    if (selectedIds.length > 1) {
      list.push({
        icon: "test-tube",
        onPress: () => onTestMany(),
      });
    } else {
      list.push({
        icon: "",
      });
    }

    list.push({
      icon: "",
    });

    list.push({
      icon: "",
    });

    list.push({
      icon: "tag-off-outline",
      onPress: onRemoveCardsFromTag,
    });

    setToggledButtons(list);
  };

  return (
    <ActionsBar
      toggle={isMultiSelect}
      buttons={buttons}
      toggledButtons={toggledButtons}
    />
  );
}
