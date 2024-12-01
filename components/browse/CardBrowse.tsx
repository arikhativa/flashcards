import {Dimensions, View} from 'react-native';
import {Text} from 'react-native-paper';
import CardSides from '../shared/CardSides';
import {Card} from '../types/Card';
import {margin} from '../constants/styles';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {useStore} from '../providers/GlobalStore';
import CardComment from '../card/CardComment';

export interface CardBrowseRef {}

interface CardBrowseProps {
  card: Card;
  index: number;
  length: number;
}
// TODO remove forwardRef if not using it
const CardBrowse = forwardRef<CardBrowseRef, CardBrowseProps>(
  ({card, index, length}, ref) => {
    const {keyboardHeight} = useStore();
    const containerHeight = Dimensions.get('window').height - keyboardHeight;
    const cardHeight = containerHeight / 4;
    const paddingHeight = containerHeight / 60;

    const inputRef = useRef(null);

    return (
      <View style={{height: containerHeight}}>
        <Text
          variant="titleLarge"
          style={{alignSelf: 'center', paddingVertical: paddingHeight}}>
          {index + 1}/{length}
        </Text>
        <CardSides
          disabled
          cardHeight={cardHeight}
          style={margin.x2}
          knowledgeLevel={card.knowledgeLevel}
          sideA={card.sideA}
          sideB={card.sideB}
        />

        {card.comment && (
          <CardComment disabled style={[margin.base2]} value={card.comment} />
        )}
      </View>
    );
  },
);

CardBrowse.displayName = 'CardBrowse';

export default CardBrowse;
