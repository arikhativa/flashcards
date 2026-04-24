import MainScreen from '@/components/MainScreen';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import { CardMeta } from '@/lib/types';
import { Link } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Separator } from '@rn-primitives/select';
import TestSummaryCardList from '@/components/test/TestSummaryCardList';
import { useTest } from '@/components/provider/TestProvider';

export interface FinishScreenProps {
  cardsToTest: Card[];
  metadataList: CardMeta[];
}

export default function TestFinishScreen() {
  const { cardsToTest, metadataList } = useTest();

  const { update } = useCardEdit();

  const { mutate } = useMutation({
    mutationFn: () => {
      const now = new Date();
      return Promise.all(cardsToTest.map((e) => update(e.id, { testedAt: now })));
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  let correctAnswers = 0;
  metadataList?.forEach((e) => {
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
            You got {correctAnswers}/{cardsToTest?.length}
          </Typography>
        </View>
        <View className="flex flex-1 flex-col">
          <Typography variant={'large'} className="pb-6">
            Adjust Knowledge Level
          </Typography>
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
