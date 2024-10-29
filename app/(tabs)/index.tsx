import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  FlatList,
  Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import StoreService from "@/services/Store";
import { Card, CardCreate } from "@/types/Card";
import { CardService } from "@/services/Card";
import { useStore } from "@/context/StoreContext";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";

export default function HomeScreen() {
  const store = useStore();
  const cardService = store.cardService;
  const [allCards, setAllCards] = useState<Card[]>([]);

  const loadCards = async () => {
    const cards = await cardService.getAll(); // Assuming getAllCards fetches cards from the DB
    setAllCards(cards);
  };

  return (
    <View>
      <View style={{ margin: 20 }}>
        <Button
          title="create"
          onPress={() => {
            if (!cardService) {
              console.log("cardService is null");
              return;
            }
            const card: CardCreate = {
              sideA: "sideA",
              sideB: "sideB",
              comment: "comment",
              knowledgeLevel: KnowledgeLevel.Learning,
            };

            cardService.create(card);
          }}
        ></Button>
      </View>

      <View>
        <Button title="Load Cards" onPress={loadCards} />
        <FlatList
          data={allCards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.sideA}</Text>}
        />
      </View>
    </View>
  );
}
