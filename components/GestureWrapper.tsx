import React, { PropsWithChildren } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type GestureWrapperProps = PropsWithChildren<{
  onPress?: () => void;
  onLongPress?: () => void;
  longPressMinDuration?: number;
  enabled?: boolean;
}>;

export const GestureWrapper: React.FC<GestureWrapperProps> = ({
  children,
  onPress,
  onLongPress,
  longPressMinDuration = 500,
  enabled = true,
}) => {
  const tap = Gesture.Tap()
    .enabled(enabled && !!onPress)
    .runOnJS(true)
    .onEnd(() => onPress?.());

  const longPress = Gesture.LongPress()
    .enabled(enabled && !!onLongPress)
    .runOnJS(true)
    .minDuration(longPressMinDuration)
    .onStart(() => onLongPress?.());

  const gesture = Gesture.Exclusive(longPress, tap);

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
};
