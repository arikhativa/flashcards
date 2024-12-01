import React, { PropsWithChildren, ReactNode } from "react";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  HandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

type GestureWrapperProps = PropsWithChildren<{
  onTap?: () => void;
  onLongPress?: () => void;
  longPressMinDuration?: number;
  enabled?: boolean;
}>;

export const GestureWrapper: React.FC<GestureWrapperProps> = ({
  children,
  onTap,
  onLongPress,
  longPressMinDuration = 500,
  enabled = true,
}) => {
  const handleLongPress = (event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onLongPress && onLongPress();
    }
  };

  const handleTap = (event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onTap && onTap();
    }
  };
  return (
    <LongPressGestureHandler
      enabled={enabled && !!handleLongPress}
      onHandlerStateChange={handleLongPress}
      minDurationMs={longPressMinDuration}
    >
      <TapGestureHandler
        enabled={enabled && !!handleTap}
        onHandlerStateChange={handleTap}
      >
        {children}
      </TapGestureHandler>
    </LongPressGestureHandler>
  );
};
