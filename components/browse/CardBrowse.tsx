import React from 'react';
import {Dimensions, View} from 'react-native';
import {Text} from 'react-native-paper';
import CardSides from '../shared/CardSides';
import {Card} from '../../types/Card';
import {flex, margin} from '../../constants/styles';
import {useStore} from '../../providers/GlobalStore';
import CardComment from '../card/CardComment';

interface Props {
  card: Card;
  index: number;
  length: number;
}
function CardBrowse({card, index, length}: Props) {
  const {keyboardHeight} = useStore();
  const containerHeight = Dimensions.get('window').height - keyboardHeight;
  const cardHeight = containerHeight / 4;
  const paddingHeight = containerHeight / 60;
  const paddingStyle = {paddingVertical: paddingHeight};

  return (
    <View style={{height: containerHeight}}>
      <Text variant="titleLarge" style={[flex.alignSelfCenter, paddingStyle]}>
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
}

export default CardBrowse;
