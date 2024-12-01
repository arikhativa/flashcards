import React from 'react';

import {BottomNavigation} from 'react-native-paper';

import CardsScreen from '.';
import TagsScreen from './tags';
import ConfScreen from './conf';
import {NAV_BAR_HEIGHT} from '../../constants/general';

export default function TabLayout() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'cards',
      title: 'Cards',
      focusedIcon: 'cards',
      unfocusedIcon: 'cards-outline',
    },
    {
      key: 'tags',
      title: 'Tags',
      focusedIcon: 'tag-multiple',
      unfocusedIcon: 'tag-multiple-outline',
    },
    {
      key: 'conf',
      title: 'Settings',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    cards: CardsScreen,
    tags: TagsScreen,
    conf: ConfScreen,
  });

  return (
    <BottomNavigation
      barStyle={{height: NAV_BAR_HEIGHT}}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
