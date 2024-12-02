import React from 'react';
import {RouteProp} from '@react-navigation/native';
import Card from '../components/card/Card';
import {StackEndpoints} from '../navigation/MainStack';

interface Props {
  route: RouteProp<StackEndpoints, 'Card'>;
}

export default function CardScreen({route}: Props) {
  const {id, mode} = route.params;

  if (!id) {
    console.error('CardScreen: id or mode not found in route params');
  }

  return <Card id={id} mode={mode} />;
}
