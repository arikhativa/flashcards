import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {FAB} from 'react-native-paper';
import {Props as FABProps} from 'react-native-paper/src/components/FAB/FAB.tsx';
import {useDisabled} from '../../hooks/useDisabled';

export default function FABWrapper({
  size,
  variant,
  visible,
  disabled,
  icon,
  onPress,
}: FABProps) {
  const {isDisabled, setDisabledForTime} = useDisabled();

  const handleOnPress = (e: GestureResponderEvent) => {
    if (!onPress || isDisabled) {
      return;
    }
    setDisabledForTime(1000);
    onPress(e);
  };

  return (
    <FAB
      size={size}
      variant={variant}
      visible={visible}
      disabled={disabled}
      icon={icon || 'plus'}
      onPress={handleOnPress}
    />
  );
}
