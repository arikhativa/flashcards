import React from 'react';
import Tags from '../components/tags/Tags';
import {useMultiSelect} from '../hooks/useMultiSelect';
import {useStore} from '../providers/GlobalStore';
import {RootStack} from '../navigation/MainStack';
import {useNavigation} from '@react-navigation/native';

export default function TagsScreen() {
  const navigation = useNavigation<RootStack>();
  const {tags, tagService, conf} = useStore();
  const multiSelect = useMultiSelect();

  return (
    <Tags
      navigation={navigation}
      conf={conf}
      tags={tags}
      tagService={tagService}
      multiSelect={multiSelect}
    />
  );
}
