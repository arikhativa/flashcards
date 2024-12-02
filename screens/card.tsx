import React from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {CardsStackParamList} from '../navigation/CardsNavigationStack';
import Card from '../components/card/Card';

type CardScreenRouteProp = RouteProp<CardsStackParamList, 'Card'>;

interface CardScreenProps {
  route: CardScreenRouteProp;
}

export default function CardScreen({route}: CardScreenProps) {
  const {id, mode} = route.params;

  if (!id) {
    console.error('CardScreen: id or mode not found in route params');
  }

  return <Card id={id} mode={mode} />;
}
