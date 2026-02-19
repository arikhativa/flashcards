import CardTileList from '@/components/card/CardTileList';
import MainScreen from '@/components/MainScreen';
import { useSuspenseCardList } from '@/hooks/query/useCardList';
import * as React from 'react';

export default function Tab() {
  const { data, isError } = useSuspenseCardList();

  if (isError) {
    console.log('Error with card list');
  }

  return (
    <MainScreen>
      <CardTileList cardList={data} />;
    </MainScreen>
  );
}
