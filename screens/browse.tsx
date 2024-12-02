import React, {useLayoutEffect, useState} from 'react';
import {Card} from '../types/Card';
import {useStore} from '../providers/GlobalStore';
import {rawStringArrayToIntArray} from '../utils/generic';
import BrowseManager from '../components/browse/BrowseManager';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackEndpoints} from '../navigation/MainStack';
import {RawIds} from '../types/generic';

interface Props {
  route: RouteProp<StackEndpoints, 'Browse'>;
}

const BrowseScreen: React.FC = ({route}: Props) => {
  const {cards} = useStore();
  const navigation = useNavigation();
  const {rawIds} = route.params;

  const [cardsToBrowse, setCardsToBrowse] = useState<Card[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    if (rawIds) {
      const idsList = rawStringArrayToIntArray(rawIds);

      if (idsList.length) {
        setCardsToBrowse(getCardsById(idsList));
      }

      setIsInitialized(true);
    }
  }, []);

  const getCardsById = (ids: number[]): Card[] => {
    return ids.map(id => cards.find(card => card.id === id)!);
  };

  if (!isInitialized) {
    return null;
  }

  return <BrowseManager cards={cardsToBrowse} />;
};

export default BrowseScreen;
