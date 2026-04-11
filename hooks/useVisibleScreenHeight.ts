import { useEffect, useState } from 'react';
import { Dimensions, Keyboard, Platform } from 'react-native';

export function useVisibleScreenHeight() {
  const [visibleHeight, setVisibleHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const windowHeight = Dimensions.get('window').height;

    const onKeyboardShow = (e: any) => {
      const keyboardHeight = e.endCoordinates?.height ?? 0;
      setVisibleHeight(windowHeight - keyboardHeight);
    };

    const onKeyboardHide = () => {
      setVisibleHeight(windowHeight);
    };

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, onKeyboardShow);
    const hideSub = Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return visibleHeight;
}
