import { View } from "react-native";
import { FAB } from "react-native-paper";
import { useStore } from "@/providers/GlobalStore";
import { Link } from "expo-router";
import { margin } from "@/constants/styles";
import { container } from "../../constants/styles";
import { getCardHref } from "@/utils/links";
import { NEW_ID } from "../[objType]";
import { CardManyTiles } from "@/components/CardManyTiles";
import CardsActions from "@/components/CardsActions";
import { useEffect, useState } from "react";
import { SelectedKL } from "@/types/KnowledgeLevel";
import { Card } from "@/types/Card";

export default function CardsScreen() {
  const { cards } = useStore();
  const [cardsLocal, setCardsLocal] = useState(cards);
  const [query, setQuery] = useState("");

  const [selectedKL, setSelectedKL] = useState<SelectedKL>({
    Learning: true,
    GettingThere: true,
    Confident: true,
  });

  useEffect(() => {
    const filterCardsByKL = (list: Card[]) => {
      return list.filter((card) => selectedKL[card.knowledgeLevel]);
    };

    const filterCardsBySearch = (list: Card[]) => {
      if (!query || query === "") {
        return list;
      }

      return list.filter(
        (card) =>
          card.sideA.toLowerCase().includes(query.toLowerCase()) ||
          card.sideB.toLowerCase().includes(query.toLowerCase())
      );
    };

    const setCardsLocalWitFilters = (list: Card[]) => {
      list = filterCardsByKL(list);
      list = filterCardsBySearch(list);
      setCardsLocal(list);
    };

    setCardsLocalWitFilters(cards);
  }, [cards, query, selectedKL]);

  return (
    <View style={[container.flex1, margin.top2]}>
      <CardsActions
        query={query}
        onQueryChange={setQuery}
        selectedKL={selectedKL}
        onKLChange={setSelectedKL}
      />
      <CardManyTiles cards={cardsLocal} />
      <Link
        style={container.buttonBottomRight}
        href={getCardHref(NEW_ID)}
        asChild
      >
        <FAB icon="plus" />
      </Link>
    </View>
  );
}
