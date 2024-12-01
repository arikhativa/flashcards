import React from 'react';
import Cards from '../components/cards/Cards';
import {useMultiSelect} from '../hooks/useMultiSelect';
import {useStore} from '../providers/GlobalStore';
import {RootStack} from '../navigation/MainStack';
import {useNavigation} from '@react-navigation/native';

export default function CardsScreen() {
  const navigation = useNavigation<RootStack>();
  const store = useStore();
  const multiSelect = useMultiSelect();

  return (
    <Cards navigation={navigation} store={store} multiSelect={multiSelect} />
  );
}
