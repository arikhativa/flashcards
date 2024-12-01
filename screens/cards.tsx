import React from 'react';
import Cards from '../components/cards/Cards';
import {useMultiSelect} from '../hooks/useMultiSelect';
import {useStore} from '../providers/GlobalStore';

export default function CardsScreen() {
  const store = useStore();
  const multiSelect = useMultiSelect();

  return <Cards store={store} multiSelect={multiSelect} />;
}
