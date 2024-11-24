import { useEffect, useState } from "react";
import ActionsBar, {
  DangerButtons,
  FABProps,
  MainButtons,
} from "../shared/ActionsBar";

interface TagActionBarProps {
  isMultiSelect: boolean;
  selectedIds: number[];
  onAddCard: () => void;
  onTestMany: () => void;
  onRemoveCardsFromTag: () => void;
}

export default function TagActionBar({
  isMultiSelect,
  selectedIds,
  onAddCard,
  onTestMany,
  onRemoveCardsFromTag,
}: TagActionBarProps) {
  const [buttons] = useState<MainButtons>({
    a: {
      icon: "plus",
      onPress: onAddCard,
    },
  });

  const [toggledButtons, setToggledButtons] = useState<MainButtons>({});
  const [toggledDangerButtons, setToggledDangerButtons] =
    useState<DangerButtons>({});

  useEffect(() => {
    setMultiSelectButtons();
  }, [selectedIds]);

  const setMultiSelectButtons = () => {
    let testMany: FABProps | undefined = undefined;

    if (selectedIds.length > 1) {
      testMany = { icon: "test-tube", onPress: () => onTestMany() };
    }

    setToggledButtons({
      b: testMany,
    });
    setToggledDangerButtons({
      a: {
        icon: "tag-off-outline",
        onPress: onRemoveCardsFromTag,
      },
    });
  };

  return (
    <ActionsBar
      marginTop={0}
      buttons={buttons}
      toggle={isMultiSelect}
      toggledButtons={toggledButtons}
      toggledDangerButtons={toggledDangerButtons}
    />
  );
}
