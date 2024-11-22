import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { Platform } from "react-native";

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(
    Platform.OS === "ios" ? 216 : 300
  );

  useEffect(() => {
    // This should only be called one
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      if (e.endCoordinates.height !== keyboardHeight) {
        setKeyboardHeight(e.endCoordinates.height);
      }
    });

    return () => {
      showSubscription.remove();
    };
  }, []);

  return { keyboardHeight };
}
