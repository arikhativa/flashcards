import { useState, useEffect } from 'react';
import { Dimensions, Keyboard, Platform, EmitterSubscription } from 'react-native';
import useConfigEdit from '@/hooks/mutation/useConfigEdit';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenHeight = Dimensions.get('window').height;

export function useVisibleScreenHeight() {
  const { data } = useSuspenseConfig();
  const insets = useSafeAreaInsets();
  const { update } = useConfigEdit();

  const [visibleHeight, setVisibleHeight] = useState(
    data.screenHeightWithoutKeyboard !== null ? data.screenHeightWithoutKeyboard : screenHeight / 2
  );

  useEffect(() => {
    const handleKeyboardChange = (e: any) => {
      const keyboardStartY = e.endCoordinates?.screenY ?? screenHeight;
      const newVisibleHeight = keyboardStartY - insets.top;

      setVisibleHeight(newVisibleHeight);

      if (data.screenHeightWithoutKeyboard !== newVisibleHeight) {
        update({ screenHeightWithoutKeyboard: newVisibleHeight });
      }
    };

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

    const subs: EmitterSubscription[] = [Keyboard.addListener(showEvent, handleKeyboardChange)];

    return () => subs.forEach((s) => s.remove());
  }, [data.screenHeightWithoutKeyboard, update]);

  return visibleHeight;
}
