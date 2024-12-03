import React from 'react';
import ActionsBar, {FABProps} from './ActionsBar';

interface Props {
  onSelectMany: () => void;
}

export default function DialogActionBar({onSelectMany}: Props) {
  const selectMany: FABProps = {
    icon: 'check',
    onPress: onSelectMany,
  };

  const buttons = {
    a: selectMany,
  };

  return <ActionsBar buttons={buttons} />;
}
