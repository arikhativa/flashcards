import TestForm from '@/components/test/TestForm';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function TestTagScreen() {
  const navigation = useNavigation();
  const { ids } = useLocalSearchParams<{ ids: string }>();

  useEffect(() => {
    navigation.setOptions({ title: 'Test Selected Tags' });
  }, [navigation]);

  const selectedIds = ids ? ids.split(',').map(Number) : [];

  return <TestForm tagIdsToTest={selectedIds} />;
}
