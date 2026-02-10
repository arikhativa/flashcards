import { Card } from '@/db/schema';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Separator } from '@/components/ui/separator';
import CardTile from '@/components/card/CardTile';

import { FlashList } from '@shopify/flash-list';

interface Props {
  cardList: Card[];
}

export default function CardTileList({ cardList }: Props) {
  return (
    <View className="bg-red-200">
      <FlashList
        renderItem={({ item }) => {
          return <CardTile card={item} />;
        }}
        data={cardList}
      />
    </View>
  );
}
