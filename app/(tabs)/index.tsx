import { View, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { CardCreate, CardUpdate } from "@/types/Card";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { CardTile } from "@/components/CardTile";
import { useStore } from "@/providers/GlobalStore";
import { Link } from "expo-router";
import { margin } from "@/constants/styles";

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
      <View style={margin.base2}>
        <Button
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
        >
          create
        </Button>
        <Button
          onPress={() => {
            if (!cardService) {
              console.log("cardService is null");
              return;
            }
            const card: CardCreate = {
              sideA: "manger",
              sideB: "eat",
              comment: "linked id: " + tags[0].id,
              knowledgeLevel: KnowledgeLevel.Learning,
              tags: [tags[0].id],
            };

            cardService.create(card);
          }}
        >
          create and link
        </Button>
        <Button
          onPress={() => {
            const card: CardUpdate = {
              comment: "updated comment",
            };

            cardService.update(cards[0].id, card);
          }}
        >
          update
        </Button>
        <Button
          onPress={() => {
            cardTagService.link(cards[cards.length - 1].id, tags[0].id);
          }}
        >
          link last elem
        </Button>
        <Button
          onPress={() => {
            cardService.delete(cards[0].id);
          }}
        >
          delete
        </Button>
        <Button
          onPress={() => {
            logCards();
          }}
        >
          log
        </Button>
      </View>

      <View>
        <FlatList
          data={cards}
          keyExtractor={(card) => card.id.toString()}
          // TODO this 4 needs to be responsive
          numColumns={4}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
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
