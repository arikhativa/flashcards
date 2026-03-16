import TestManager from '@/components/test/TestManager';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function TestCarousel() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return <TestManager />;
}
