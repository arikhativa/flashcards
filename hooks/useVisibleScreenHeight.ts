import { useState, useEffect } from 'react';
import { Dimensions, Keyboard, Platform, EmitterSubscription } from 'react-native';
import useConfigEdit from '@/hooks/mutation/useConfigEdit';
import { useSuspenseConfig } from '@/hooks/query/useConfig';

export function useVisibleScreenHeight() {
  console.log('R useVisibleScreenHeight');

  const { data } = useSuspenseConfig();
  const { update } = useConfigEdit();

  const [visibleHeight, setVisibleHeight] = useState(
    data.screenHeightWithoutKeyboard !== null
      ? data.screenHeightWithoutKeyboard
      : Dimensions.get('window').height / 2
  );

  useEffect(() => {
    const handleKeyboardChange = (e: any) => {
      const keyboardHeight = e.endCoordinates?.height ?? 0;
      if (keyboardHeight === 0) return;

      const windowHeight = Dimensions.get('window').height;
      const currentMeasuredHeight = windowHeight - keyboardHeight;

      setVisibleHeight(currentMeasuredHeight);

      if (data.screenHeightWithoutKeyboard !== currentMeasuredHeight) {
        update({ screenHeightWithoutKeyboard: currentMeasuredHeight });
      }
    };

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

    const subs: EmitterSubscription[] = [Keyboard.addListener(showEvent, handleKeyboardChange)];

    return () => subs.forEach((s) => s.remove());
  }, [data.screenHeightWithoutKeyboard, update]);

  return visibleHeight;
}
