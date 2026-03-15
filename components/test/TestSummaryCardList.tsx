import CardTile from '@/components/card/CardTile';
import TestStatusButton from '@/components/test/TestStatusButton';
import { Card } from '@/db/schema';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';

interface Props {
  cards: Card[];
}

export default function TestSummaryCardList({ cards }: Props) {
  return (
    <FlashList
      data={cards}
      horizontal={false}
      numColumns={1}
      className="px-4"
      renderItem={({ item }) => {
        return (
          <View className="flex w-fit items-center">
            <TestStatusButton type={} />
            <CardTile className="m-2" card={item} />
          </View>
        );
      }}
    />
  );
}
