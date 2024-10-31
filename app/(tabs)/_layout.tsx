import React from "react";

import { BottomNavigation } from "react-native-paper";

import CardsScreen from ".";
import TagsScreen from "./tags";
import ConfScreen from "./conf";

export default function TabLayout() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "cards",
      title: "Cards",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "tags",
      title: "Tags",
      focusedIcon: "album",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "conf",
      title: "Settings",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    cards: CardsScreen,
    tags: TagsScreen,
    conf: ConfScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
