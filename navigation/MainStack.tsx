import React from 'react';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {ComponentProps} from '../types/generic';
import CardScreen from '../screens/card';
import NavigationBar from './NavigationBar';
import {TagParam} from '../components/tag/Tag';
import TagScreen from '../screens/tag';
import BrowseScreen, {BrowseParam} from '../screens/browse';
import TestScreen, {TestParam} from '../screens/test';

export type StackEndpoints = {
  Home: undefined;
  Card: ComponentProps;
  Tag: TagParam;
  Browse: BrowseParam;
  Test: TestParam;
};

export type RootStack = StackNavigationProp<StackEndpoints>;

const Stack = createStackNavigator<StackEndpoints>();

export default function MainStack() {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={NavigationBar} />
      <Stack.Screen name="Card" component={CardScreen} />
      <Stack.Screen name="Tag" component={TagScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen
        name="Browse"
        component={BrowseScreen}
        options={() => ({title: 'Browsing Cards', headerShown: true})}
      />
    </Stack.Navigator>
  );
}
