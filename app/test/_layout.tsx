import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function TestLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Test Setup' });
  }, [navigation]);

  return <Slot />;
}
