import { Button, View, FlatList, StyleSheet } from "react-native";

import { TagCreate, TagUpdate } from "@/types/Tag";
import { TagTile } from "@/components/TagTile";
import { useStore } from "@/providers/GlobalStore";
import { container, margin } from "@/constants/styles";

export default function TagsScreen() {
  const { cards, tags, tagService } = useStore();

  return (
    <View>
      <View style={margin.base2}>
        <Button
          title="create"
          onPress={() => {
            const tag: TagCreate = {
              name: "Verbs",
            };

            tagService.create(tag);
          }}
        ></Button>
        <Button
          title="create and link"
          onPress={() => {
            const tag: TagCreate = {
              name: "linked tag",
              cards: [cards[0], cards[1]],
            };

            tagService.create(tag);
          }}
        ></Button>
        <Button
          title="update"
          onPress={() => {
            const tag: TagUpdate = {
              name: "Animals",
            };

            tagService.update(tags[0].id, tag);
          }}
        ></Button>
        <Button
          title="delete"
          onPress={() => {
            tagService.delete(tags[0].id);
          }}
        ></Button>
      </View>

      <View style={[{ maxHeight: 400 }]}>
        <FlatList
          data={tags}
          keyExtractor={(tag) => tag.id.toString()}
          numColumns={3}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item }) => <TagTile showSize tag={item}></TagTile>}
        />
      </View>
    </View>
  );
}
