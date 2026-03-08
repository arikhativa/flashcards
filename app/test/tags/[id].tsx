import TestForm from '@/components/test/TestForm';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function TestTagScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Test Setup' });
  }, [navigation]);

  const { id } = useLocalSearchParams();

  return <TestForm />;
}
