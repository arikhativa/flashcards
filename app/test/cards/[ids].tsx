import TestForm from '@/components/test/TestForm';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function TestCardsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Test Setup' });
  }, [navigation]);

  const { ids } = useLocalSearchParams<{ ids: string }>();
  const selectedIds = ids ? ids.split(',').map(Number) : [];

  return <TestForm />;
}
