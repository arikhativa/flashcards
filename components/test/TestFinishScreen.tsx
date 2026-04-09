import MainScreen from '@/components/MainScreen';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import { CardMeta } from '@/lib/types';
import { Link } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Separator } from '@rn-primitives/select';
import TestSummaryCardList from '@/components/test/TestSummaryCardList';
import { KnowledgeLevelEnum } from '@/lib/enums';

export interface FinishScreenProps {
  cardsToTest: Card[];
  metadataList: CardMeta[];
}

export default function TestFinishScreen({ cardsToTest, metadataList }: FinishScreenProps) {
  const [local, setLocal] = useState<Card[]>(cardsToTest);

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

  // Note: this whole flow is bad - we should have one use state of the cards
  // the location of hooks/useCreateTestMetadata.ts calls are wrong
  const updateCard = (id: number, kl: KnowledgeLevelEnum) => {
    setLocal((prev) => {
      const l = prev.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            knowledgeLevel: kl,
          };
        }
        return e;
      });
      return l;
    });
  };

  return (
    <>
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
          <TestSummaryCardList
            updateCard={updateCard}
            cardsToTest={local}
            metadataList={metadataList}
          />
        </View>
      </MainScreen>
      <View className="flex items-center justify-center border-t border-border pb-4">
        <Link asChild href={'/'} replace>
          <Button variant={'outline'} className="mt-4 w-fit">
            <Typography>Home</Typography>
          </Button>
        </Link>
      </View>
    </>
  );
}
