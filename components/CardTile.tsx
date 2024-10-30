import { StyleSheet, Text, View } from "react-native";
import { Card } from "@/types/Card";

export type CardTileProps = {
  card: Card;
};

export function CardTile({ card }: CardTileProps) {
  return (
    <View style={styles.container}>
      <Text>{card.id}</Text>
      <Text>{card.sideA}</Text>
      <Text>{card.sideB}</Text>
      <Text>{card.comment}</Text>
      <Text>{card.knowledgeLevel}</Text>
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
