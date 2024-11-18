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
      focusedIcon: "cards",
      unfocusedIcon: "cards-outline",
    },
    {
      key: "tags",
      title: "Tags",
      focusedIcon: "tag-multiple",
      unfocusedIcon: "tag-multiple-outline",
    },
    {
      key: "conf",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
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
