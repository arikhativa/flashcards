import React from 'react';
import {Card} from '../../types/Card';
import {BaseCrud} from '../../types/generic';
import {memo} from 'react';
import {View} from 'react-native';
import {CardTile} from './CardTile';
import {flex} from '../../constants/styles';

export type Row = BaseCrud & {
  cards: Card[];
};

interface CardRowMemoProps {
  item: Row;
  tileHeight: number;
  onLongPress: (id: number) => void;
  onPress: (id: number) => void;
  isSelected: (id: number) => boolean;
}

const CardRowMemo = memo(
  ({item, tileHeight, onLongPress, onPress, isSelected}: CardRowMemoProps) => {
    const children = item.cards.map(card => {
      return (
        <CardTile
          style={{height: tileHeight}}
          key={card.id}
          card={card}
          onLongPress={onLongPress}
          onPress={onPress}
          isSelected={isSelected(card.id)}
        />
      );
    });

    return (
      <View key={item.id} style={flex.row}>
        {children}
      </View>
    );
  },
);

CardRowMemo.displayName = 'CardRowMemo';

export default CardRowMemo;
