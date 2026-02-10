import CardTileList from '@/components/card/CardTileList';
import { Text } from '@/components/ui/text';
import useCardList from '@/hooks/query/useCardList';
import * as React from 'react';
import { View } from 'react-native';

export default function Screen() {
  const { data, isError } = useCardList();

  if (isError) {
    console.log('Error with card list');
  }

  if (data) {
    return <CardTileList cardList={data} />;
  }
  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <Text>empty</Text>
    </View>
  );
}
