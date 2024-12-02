import React from 'react';

import ConfScreen from '../screens/conf';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import CardsScreen from '../screens/cards';
import TagsScreen from '../screens/tags';

export type RootTabParamList = BottomTabScreenProps<{
  Home: undefined;
  Tags: undefined;
  Conf: undefined;
}>;

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const ICON_SIZE = 26;

const CardsIcon = ({focused, color}) => (
  <MaterialCommunityIcons
    name={focused ? 'cards' : 'cards-outline'}
    color={color}
    size={ICON_SIZE}
  />
);

const TagsIcon = ({focused, color}) => (
  <MaterialCommunityIcons
    name={focused ? 'tag-multiple' : 'tag-multiple-outline'}
    color={color}
    size={ICON_SIZE}
  />
);

const ConfIcon = ({focused, color}) => (
  <MaterialCommunityIcons
    name={focused ? 'cog' : 'cog-outline'}
    color={color}
    size={ICON_SIZE}
  />
);

export default function NavigationBar() {
  return (
    <Tab.Navigator id={undefined} initialRouteName="Cards">
      <Tab.Screen
        options={{
          tabBarIcon: CardsIcon,
        }}
        name="Cards"
        component={CardsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: TagsIcon,
        }}
        name="Tags"
        component={TagsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ConfIcon,
        }}
        name="Settings"
        component={ConfScreen}
      />
    </Tab.Navigator>
  );
}
