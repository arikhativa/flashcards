import { View, FlatList } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { CardCreate } from "@/types/Card";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { CardTile } from "@/components/CardTile";
import { useStore } from "@/providers/GlobalStore";
import { Link } from "expo-router";
import { baseUnit, margin } from "@/constants/styles";
import { container } from "../../constants/styles";

export default function CardsScreen() {
  const { tags, cards, cardService, cardTagService } = useStore();

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
    <View style={container.flex1}>
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
              tags: [tags[0]],
            };

            cardService.create(card);
          }}
        >
          create and link
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
          renderItem={({ item }) => <CardTile card={item}></CardTile>}
        />
      </View>
      <Link
        style={container.buttonBottomRight}
        href={{
          pathname: "/card/[id]",
          params: { id: "new" },
        }}
        asChild
      >
        <IconButton
          icon="plus"
          size={baseUnit * 5}
          mode="contained"
        ></IconButton>
      </Link>
    </View>
  );
}
