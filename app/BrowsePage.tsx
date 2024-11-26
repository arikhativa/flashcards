import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Card } from "@/types/Card";
import { useStore } from "@/providers/GlobalStore";
import { rawStringArrayToIntArray } from "@/utils/generic";
import { TestLinkProps } from "@/utils/links";
import BrowseManager from "@/components/browse/BrowseManager";

const BrowsePage: React.FC = () => {
  const { cards } = useStore();
  const navigation = useNavigation();
  const { rawIds } = useLocalSearchParams<TestLinkProps>();

  const [cardsToBrowse, setCardsToBrowse] = useState<Card[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Browsing Cards", headerShown: true });

    if (rawIds) {
      const idsList = rawStringArrayToIntArray(rawIds);

      if (idsList.length) {
        setCardsToBrowse(getCardsById(idsList));
      }

      setIsInitialized(true);
    }
  }, []);

  const getCardsById = (ids: number[]): Card[] => {
    return ids.map((id) => cards.find((card) => card.id === id)!);
  };

  if (!isInitialized) {
    return null;
  }

  return <BrowseManager cards={cardsToBrowse} />;
};

export default BrowsePage;
