import { Spinner } from '@/components/external/Spinner';
import MainScreen from '@/components/MainScreen';
import { useTest } from '@/components/provider/TestProvider';
import TestManager from '@/components/test/TestManager';
import useCreateTestMetadata from '@/hooks/useCreateTestMetadata';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function TestCarousel() {
  const navigation = useNavigation();
  const { testSettings } = useTest();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const testMetadata = useCreateTestMetadata(testSettings!);

  if (!testMetadata) {
    return (
      <MainScreen>
        <Spinner />;
      </MainScreen>
    );
  }

  if (testMetadata) {
    return <TestManager testMetadata={testMetadata} />;
  }
}
