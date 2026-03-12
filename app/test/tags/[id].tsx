import TestForm from '@/components/test/TestForm';
import { useLocalSearchParams } from 'expo-router';

export default function TestTagScreen() {
  const { id } = useLocalSearchParams();

  return <TestForm />;
}
