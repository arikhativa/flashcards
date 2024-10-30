import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  FlatList,
  Text,
} from "react-native";

import { useEffect, useState } from "react";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { useStore } from "@/context/StoreContext";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { CardTile } from "@/components/CardTile";
import { Conf } from "@/types/Conf";

export default function CardsScreen() {
  const store = useStore();
  const cardService = store.cardService;
  const confService = store.confService;
  const cardTagService = store.cardTagService;

  const [allCards, setAllCards] = useState<Card[]>(cardService.allCards);
  const [conf, setConf] = useState<Conf>(confService.conf);

  useEffect(() => {
    const updateCards = () => setAllCards([...cardService.allCards]);
    cardService.onChange(updateCards);
    return () => cardService.offChange(updateCards);
  }, [cardService]);

  useEffect(() => {
    const updateConf = () => setConf(confService.conf);
    confService.onChange(updateConf);
    return () => confService.offChange(updateConf);
  }, [confService]);

  const loadCards = async () => {
    const cards = await cardService.getAll();
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
        <Button
          title="update"
          onPress={() => {
            const card: CardUpdate = {
              comment: "updated comment",
            };

            cardService.update(allCards[0].id, card);
          }}
        ></Button>
        <Button
          title="link"
          onPress={() => {
            cardTagService.link(allCards[0].id, 2);
          }}
        ></Button>
        <Button
          title="delete"
          onPress={() => {
            cardService.delete(allCards[0].id);
          }}
        ></Button>
      </View>

      <View>
        <Button title="Load Cards" onPress={loadCards} />
        <FlatList
          data={allCards}
          keyExtractor={(card) => card.id.toString()}
          renderItem={({ item }) => (
            <CardTile
              card={item}
              sideA={conf.sideA}
              sideB={conf.sideB}
            ></CardTile>
          )}
        />
      </View>
    </View>
  );
}
