import MainScreen from '@/components/MainScreen';
import TestSummaryCardList from '@/components/test/TestSummaryCardList';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/text';
import useTestSummary from '@/hooks/state/useTestSummary';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestSummaryScreen() {
  const { data } = useTestSummary();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  let correctAnswers = 0;
  data.metadataList?.forEach((e) => {
    if (e.success === true) {
      ++correctAnswers;
    }
  });

  return (
    <SafeAreaView className="flex-1">
      <MainScreen className="flex flex-col gap-10">
        <View className="flex flex-col items-center justify-center gap-2">
          <Typography variant={'h1'}>Text is done!</Typography>
          <Typography variant={'h2'}>
            You got {correctAnswers}/{data.cardsToTest?.length}
          </Typography>
        </View>
        <View className="flex flex-1 flex-col gap-4">
          <Typography variant={'large'}>Adjust Knowledge Level</Typography>
          <Separator />
          <TestSummaryCardList />
        </View>
      </MainScreen>
    </SafeAreaView>
  );
}
