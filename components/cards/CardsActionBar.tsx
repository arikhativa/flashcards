import React from 'react';
import {useEffect, useState} from 'react';
import ActionsBar, {FABProps, MainButtons} from '../shared/ActionsBar';

interface Props {
  isMultiSelect: boolean;
  selectedIds: number[];
  onTagMany: () => void;
  onDeleteMany: () => void;
  onBrowseMany: () => void;
  onTestMany: () => void;
  onEditCard: () => void;
}

export default function CardsActionBar({
  isMultiSelect,
  selectedIds,
  onBrowseMany,
  onTagMany,
  onDeleteMany,
  onTestMany,
  onEditCard,
}: Props) {
  const dangerButton: FABProps = {
    icon: 'trash-can-outline',
    onPress: onDeleteMany,
  };

  const testMany: FABProps = {
    icon: 'school-outline',
    onPress: onTestMany,
  };

  const tagMany: FABProps = {
    icon: 'tag-plus-outline',
    onPress: onTagMany,
  };

  const browseMany: FABProps = {
    icon: 'card-search-outline',
    onPress: onBrowseMany,
  };

  const buttons = {
    a: {
      icon: 'plus',
      onPress: onEditCard,
    },
    b: {
      icon: 'school-outline',
      onPress: onTestMany,
    },
  };

  const allToggleButtons = {
    b: undefined,
    c: browseMany,
    d: tagMany,
  };

  const toggledDangerButtons = {a: dangerButton};

  const [toggledButtons, setToggledButtons] =
    useState<MainButtons>(allToggleButtons);

  useEffect(() => {
    setMultiSelectButtons();
  }, [selectedIds]);

  const setMultiSelectButtons = () => {
    if (selectedIds.length > 1) {
      setToggledButtons(prev => ({
        ...prev,
        b: testMany,
      }));
    } else {
      setToggledButtons(prev => ({
        ...prev,
        b: undefined,
      }));
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
