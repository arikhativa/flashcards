import React from 'react';

import CardsScreen from './cards';
import TagsScreen from './tags';
import ConfScreen from './conf';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './Object';

const Stack = createStackNavigator();

export default function TagsNavigationStack() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="Tags" component={TagsScreen} />
      {/* <Stack.Screen name="Tag" component={ObjectScreen} /> */}
    </Stack.Navigator>
  );
}
