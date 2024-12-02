import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {TagsStackParamList} from '../navigation/TagsNavigationStack';
import Tag from '../components/tag/Tag';

type TagScreenRouteProp = RouteProp<TagsStackParamList, 'Tag'>;

interface TagScreenProps {
  route: TagScreenRouteProp;
}

export default function TagScreen({route}: TagScreenProps) {
  const {id, mode} = route.params;

  if (!id) {
    console.error('TagScreen: id or mode not found in route params');
  }

  return <Tag id={id} mode={mode} />;
}
