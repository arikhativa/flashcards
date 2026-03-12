import TestManager from '@/components/test/TestManager';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestCarousel() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1">
      <TestManager />
    </SafeAreaView>
  );
}
