import React, {useState} from 'react';
import {Card} from '../types/Card';
import {useStore} from '../providers/GlobalStore';
import BrowseManager from '../components/browse/BrowseManager';
import {RouteProp} from '@react-navigation/native';
import {StackEndpoints} from '../navigation/MainStack';

export type BrowseParam = {
  ids: number[];
};

interface Props {
  route: RouteProp<StackEndpoints, 'Browse'>;
}

const BrowseScreen: React.FC = ({route}: Props) => {
  const {cards} = useStore();
  const {ids} = route.params;

  const [cardsToBrowse] = useState<Card[]>(getCardsById(cards, ids));

  return <BrowseManager cards={cardsToBrowse} />;
};

function getCardsById(cards: Card[], ids: number[]): Card[] {
  if (!ids || ids.length === 0) {
    console.error('BrowseScreen: empty ids');
    return [];
  }
  return ids.map(id => cards.find(card => card.id === id)!);
}

export default BrowseScreen;
