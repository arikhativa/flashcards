import { Button, View, FlatList } from "react-native";

import { useEffect, useState } from "react";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { CardTile } from "@/components/CardTile";
import { Conf } from "@/types/Conf";
import { useStore } from "@/providers/GlobalStore";

export default function CardsScreen() {
  const { conf, tags, cards, cardService, cardTagService } = useStore();

  const logCards = async () => {
    console.log(
      "allCards",
      cards.map((c) => {
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

            cardService.update(cards[0].id, card);
          }}
        ></Button>
        <Button
          title="link last elem"
          onPress={() => {
            cardTagService.link(cards[cards.length - 1].id, tags[0].id);
          }}
        ></Button>
        <Button
          title="delete"
          onPress={() => {
            cardService.delete(cards[0].id);
          }}
        ></Button>
        <Button
          title="log"
          onPress={() => {
            logCards();
          }}
        ></Button>
      </View>

      <View>
        <FlatList
          data={cards}
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
