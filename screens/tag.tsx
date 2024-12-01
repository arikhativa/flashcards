import React from 'react';
import {RouteProp} from '@react-navigation/native';
import Tag from '../components/tag/Tag';
import {StackEndpoints} from '../navigation/MainStack';

interface Props {
  route: RouteProp<StackEndpoints, 'Tag'>;
}

export default function TagScreen({route}: Props) {
  const {id, mode, cardIds} = route.params;

  if (!id) {
    console.error('TagScreen: id or mode not found in route params');
  }

  return <Tag id={id} mode={mode} cardIds={cardIds} />;
}
