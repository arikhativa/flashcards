import { FAB, IconButton } from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";

import { TagTile } from "@/components/TagTile";
import { useStore } from "@/providers/GlobalStore";
import { baseUnit, container, margin } from "@/constants/styles";
import { Link } from "expo-router";
import { getTagHref } from "@/utils/links";
import { NEW_ID } from "../[objType]";

export default function TagsScreen() {
  const { tags } = useStore();

  return (
    <View style={[container.flex1, margin.top2]}>
      <View style={[{ maxHeight: 400 }]}>
        <FlatList
          data={tags}
          keyExtractor={(tag) => tag.id.toString()}
          renderItem={({ item }) => <TagTile showSize tag={item}></TagTile>}
        />
      </View>
      <Link
        style={container.buttonBottomRight}
        href={getTagHref(NEW_ID)}
        asChild
      >
        <FAB icon="plus" />
      </Link>
    </View>
  );
}
