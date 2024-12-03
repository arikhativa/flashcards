import React from 'react';
import {useEffect, useState} from 'react';
import ActionsBar, {FABProps, MainButtons} from '../shared/ActionsBar';

interface Props {
  isMultiSelect: boolean;
  selectedIds: number[];
  onUntagCards: () => void;
  onTestMany: () => void;
  onEditCards: () => void;
}

export default function CardsSectionActionBar({
  isMultiSelect,
  selectedIds,
  onTestMany,
  onUntagCards,
  onEditCards,
}: Props) {
  const editCards: FABProps = {
    icon: 'square-edit-outline',
    onPress: onEditCards,
  };

  const dangerButton: FABProps = {
    icon: 'tag-off-outline',
    onPress: onUntagCards,
  };

  const testMany: FABProps = {
    icon: 'school-outline',
    onPress: onTestMany,
  };

  const buttons = {
    a: editCards,
  };

  const allToggleButtons = {
    b: undefined,
  };

  const toggledDangerButtons = {
    a: dangerButton,
  };

  const [toggledButtons, setToggledButtons] =
    useState<MainButtons>(allToggleButtons);

  useEffect(() => {
    setMultiSelectButtons();
  }, [selectedIds]);

  const setMultiSelectButtons = () => {
    if (selectedIds.length > 1) {
      setToggledButtons({
        b: testMany,
      });
    } else {
      setToggledButtons({
        b: undefined,
      });
    }
  };

  return (
    <ActionsBar
      buttons={buttons}
      toggle={isMultiSelect}
      toggledButtons={toggledButtons}
      toggledDangerButtons={toggledDangerButtons}
    />
  );
}
