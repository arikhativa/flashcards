import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import TestForm from "@/components/TestForm";
import { EMPTY_TEST_SETTING, TestSettings } from "@/types/TestSettings";
import TestManager from "@/components/TestManager";
import { Card } from "@/types/Card";
import { getMatchingCardsForTest } from "@/utils/cardPicker";
import { useStore } from "@/providers/GlobalStore";
import { rawStringArrayToIntArray } from "@/utils/generic";

type localSearchParams = {
  rawIds: string;
};

const TestPage: React.FC = () => {
  const { cards } = useStore();
  const navigation = useNavigation();
  const { rawIds } = useLocalSearchParams<localSearchParams>();

  const [ids, setIds] = useState<number[]>([]);
  const [isTestSetupDone, setIsTestSetupDone] = useState(false);
  const [testSettings, setTestSettings] =
    useState<TestSettings>(EMPTY_TEST_SETTING);

  const [matchingCards, setMatchingCards] = useState<Card[]>([]);

  useEffect(() => {
    if (rawIds) {
      setIds(rawStringArrayToIntArray(rawIds));
    }

    navigation.setOptions({ title: "", headerShown: false });
    setTestSettings({
      ...testSettings,
      selectedTags: [],
    });
  }, []);

  const getCardsById = (ids: number[]): Card[] => {
    return ids.map((id) => cards.find((card) => card.id === id)!);
  };

  useEffect(() => {
    if (ids.length) {
      const list = getCardsById(ids);
      setMatchingCards(list);
    } else {
      const list = getMatchingCardsForTest(cards, testSettings);
      setMatchingCards(list);
    }
  }, [cards, testSettings]);

  return (
    <>
      {isTestSetupDone ? (
        <TestManager
          matchingCards={matchingCards}
          testSettings={testSettings}
        ></TestManager>
      ) : (
        <TestForm
          preSelectedCards={ids}
          matchingCards={matchingCards}
          testSettings={testSettings}
          setTestSettings={setTestSettings}
          onSubmit={() => setIsTestSetupDone(true)}
        ></TestForm>
      )}
    </>
  );
};

export default TestPage;
