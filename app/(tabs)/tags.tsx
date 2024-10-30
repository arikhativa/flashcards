import { Button, View, FlatList } from "react-native";

import { useEffect, useState } from "react";
import { Tag, TagCreate, TagUpdate } from "@/types/Tag";
import { useStore } from "@/context/StoreContext";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { TagTile } from "@/components/TagTile";

export default function HomeScreen() {
  const store = useStore();
  const tagService = store.tagService;
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const loadTags = async () => {
    const tags = await tagService.getAll();
    setAllTags(tags);
  };

  return (
    <View>
      <View style={{ margin: 20 }}>
        <Button
          title="create"
          onPress={() => {
            if (!tagService) {
              console.log("tagService is null");
              return;
            }
            const tag: TagCreate = {
              name: "Verbs",
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

            tagService.update(allTags[0].id, tag);
          }}
        ></Button>
        <Button
          title="delete"
          onPress={() => {
            tagService.delete(allTags[0].id);
          }}
        ></Button>
      </View>

      <View>
        <Button title="Load Tags" onPress={loadTags} />
        <FlatList
          data={allTags}
          keyExtractor={(tag) => tag.id.toString()}
          renderItem={({ item }) => <TagTile tag={item}></TagTile>}
        />
      </View>
    </View>
  );
}
