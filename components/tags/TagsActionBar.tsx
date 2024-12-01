import React from 'react';
import ActionsBar, {FABProps} from '../shared/ActionsBar';

interface Props {
  isMultiSelect: boolean;
  onDeleteMany: () => void;
  onTestMany: () => void;
  onEditTag: () => void;
}

export default function TagsActionBar({
  isMultiSelect,
  onDeleteMany,
  onTestMany,
  onEditTag,
}: Props) {
  const addButton: FABProps = {
    icon: 'plus',
    onPress: onEditTag,
  };

  const dangerButton: FABProps = {
    icon: 'trash-can-outline',
    onPress: onDeleteMany,
  };

  const testMany: FABProps = {
    icon: 'school-outline',
    onPress: onTestMany,
  };

  const buttons = {
    a: addButton,
    b: testMany,
  };

  const toggleButtons = {
    b: testMany,
  };

  const toggledDangerButtons = {a: dangerButton};

  return (
    <ActionsBar
      buttons={buttons}
      toggle={isMultiSelect}
      toggledButtons={toggleButtons}
      toggledDangerButtons={toggledDangerButtons}
    />
  );
}
