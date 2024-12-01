import React from 'react';

import TagsScreen from './tags';
import ConfScreen from './conf';

import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardsNavigationStack from './CardsNavigationStack';

import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

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
    <Tab.Navigator id={undefined} initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarIcon: CardsIcon,
        }}
        name="Home"
        initialParams={{id: '1'}}
        component={CardsNavigationStack}
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
