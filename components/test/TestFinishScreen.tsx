import MainScreen from '@/components/MainScreen';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/text';
import { Card } from '@/db/schema';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import { CardMeta } from '@/lib/types';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import useTestSummary from '@/hooks/state/useTestSummary';

interface Props {
  cardsToTest: Card[];
  metadataList: CardMeta[];
}

export default function TestFinishScreen({ cardsToTest, metadataList }: Props) {
  const { update } = useCardEdit();
  const { setData } = useTestSummary();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const now = new Date();
      return Promise.all(cardsToTest.map((e) => update(e.id, { testedAt: now })));
    },
    onSuccess: () => {
      setData({ cardsToTest, metadataList });
      router.replace('/test/summary');
    },
  });

  return (
    <MainScreen className="items-center justify-center gap-6">
      <Button onPress={() => mutate()} disabled={isPending}>
        <Typography variant={'large'}>{isPending ? 'Saving...' : 'Finish Test?'}</Typography>
      </Button>
    </MainScreen>
  );
}
