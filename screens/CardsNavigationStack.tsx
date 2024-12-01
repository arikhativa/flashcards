import React from 'react';

import CardsScreen from './cards';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import ObjectScreen from './Object';

export type CardParam = {
  id: string;
};

export type CardsStackParamList = {
  Cards: undefined;
  Card: CardParam;
};

export type CardsScreenNavigationProp =
  StackNavigationProp<CardsStackParamList>;

const Stack = createStackNavigator<CardsStackParamList>();

export default function CardsNavigationStack() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="Cards" component={CardsScreen} />
      <Stack.Screen name="Card" component={ObjectScreen} />
    </Stack.Navigator>
  );
}
