import TestManager from '@/components/test/TestManager';
import useCardList from '@/hooks/query/useCardList';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function TestCarousel() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { data } = useCardList();
  if (data) {
    return <TestManager cards={data} />;
  }
}
