import MainScreen from '@/components/MainScreen';
import TestSummaryCardList from '@/components/test/TestSummaryCardList';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/text';
import useTestSummary from '@/hooks/state/useTestSummary';
import { Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

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
    <View className="flex-1">
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
      <View className="flex items-center justify-center border-t border-border pb-4">
        <Link asChild href={'/'} replace>
          <Button variant={'outline'} className="mt-4 w-fit">
            <Typography>Home</Typography>
          </Button>
        </Link>
      </View>
    </View>
  );
}
