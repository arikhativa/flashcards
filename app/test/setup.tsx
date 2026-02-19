import TestForm from '@/components/test/TestForm';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function TestScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Test Setup' });
  }, [navigation]);

  return <TestForm />;
}
