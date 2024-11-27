import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { Platform } from "react-native";

const minHeightKeyboardHeight = Platform.OS === "ios" ? 216 : 300;

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(minHeightKeyboardHeight);

  useEffect(() => {
    // This should only be called one
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      if (e.endCoordinates.height !== keyboardHeight) {
        if (e.endCoordinates.height < minHeightKeyboardHeight) {
          return;
        }

        setKeyboardHeight(e.endCoordinates.height);
      }
    });

    return () => {
      showSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { keyboardHeight };
}
