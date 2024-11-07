import { IconButton } from "react-native-paper";
import { View, FlatList, StyleSheet } from "react-native";

import { TagTile } from "@/components/TagTile";
import { useStore } from "@/providers/GlobalStore";
import { baseUnit, container, margin } from "@/constants/styles";
import { Link } from "expo-router";
import { NEW_TAG_ID } from "../tag/[id]";
import { getTagHref } from "@/utils/links";

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
        href={getTagHref(NEW_TAG_ID)}
        asChild
      >
        <IconButton
          icon="plus"
          size={baseUnit * 5} // TODO move to general style ()also in index.tsx
          mode="contained"
        ></IconButton>
      </Link>
    </View>
  );
}
