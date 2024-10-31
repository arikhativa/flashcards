import { Button, View, FlatList } from "react-native";

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cardService.listenArray(setAllCards), [cardService]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(confService.listen(setConf), [confService]);

  const loadCards = async () => {
    console.log(
      "allCards",
      allCards.map((c) => {
        return {
          id: c.id,
          tags: c.tags.map((t) => t.id),
        };
      })
    );
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
              comment: "linked! 2",
              knowledgeLevel: "asd" as KnowledgeLevel,
              tags: [2],
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
