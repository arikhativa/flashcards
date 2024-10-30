import { FlatList, StyleSheet, Text, View } from "react-native";
import { Tag } from "@/types/Tag";

export type TagTileProps = {
  tag: Tag;
};

export function TagTile({ tag }: TagTileProps) {
  return (
    <View style={styles.container}>
      <Text>{tag.id}</Text>
      <Text>{tag.name}</Text>
      <Text>Cards ids:</Text>
      <FlatList
        data={tag.cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.id}</Text>}
      />
      <Text>----</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
