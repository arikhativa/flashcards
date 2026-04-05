import CardTile from '@/components/card/CardTile';
import TestStatusButton from '@/components/test/TestStatusButton';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Card } from '@/db/schema';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import useTestSummary from '@/hooks/state/useTestSummary';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { decreaseKL, increaseKL } from '@/lib/utils';
import { FlashList } from '@shopify/flash-list';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Minus, Plus } from 'lucide-react-native';
import { View } from 'react-native';

export default function TestSummaryCardList() {
  const queryClient = useQueryClient();
  const { data, updateCard } = useTestSummary();
  const { update } = useCardEdit();

  const { mutate } = useMutation({
    mutationFn: async (variables: { id: Card['id']; kl: Card['knowledgeLevel'] }) => {
      return update(variables.id, { knowledgeLevel: variables.kl });
    },
    onSuccess: (newCard) => {
      updateCard(data, newCard.id, { knowledgeLevel: newCard.knowledgeLevel });
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.cards.detail(newCard.id).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: queryKeyStore.cards.list._def });
    },
    onError: (e) => {
      console.error('mutate err: ', e);
    },
  });

  const increaseKLPress = (card: Card) => {
    const newKL = increaseKL(card.knowledgeLevel);
    if (newKL !== card.knowledgeLevel) {
      mutate({ id: card.id, kl: newKL });
    }
  };

  const decreaseKLPress = (card: Card) => {
    const newKL = decreaseKL(card.knowledgeLevel);
    if (newKL !== card.knowledgeLevel) {
      mutate({ id: card.id, kl: newKL });
    }
  };

  return (
    <FlashList
      data={data.cardsToTest}
      horizontal={false}
      numColumns={1}
      className="bl px-4"
      renderItem={({ item, index }) => {
        const metadata = data.metadataList![index]!;
        return (
          <View className="flex flex-row items-center gap-4 py-4">
            <TestStatusButton showBtnColor type={metadata.success ? 'check' : 'x'} />

            <View className="flex-1 px-10">
              <CardTile className="m-2" card={item} />
            </View>

            <View className="flex flex-col gap-4">
              <Button onPress={() => increaseKLPress(item)} variant={'outline'} size={'icon'}>
                <Icon as={Plus} />
              </Button>
              <Button onPress={() => decreaseKLPress(item)} variant={'outline'} size={'icon'}>
                <Icon as={Minus} />
              </Button>
            </View>
          </View>
        );
      }}
    />
  );
}
