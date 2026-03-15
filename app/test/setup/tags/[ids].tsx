import TestForm from '@/components/test/TestForm';
import { useLocalSearchParams } from 'expo-router';

export default function TestTagScreen() {
  const { ids } = useLocalSearchParams<{ ids: string }>();
  const selectedIds = ids ? ids.split(',').map(Number) : [];

  return <TestForm tagIdsToTest={selectedIds} />;
}
