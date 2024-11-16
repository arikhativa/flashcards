import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import TagComponent from "@/components/Tag";
import { ComponentProps, CRUDMode, ObjType } from "@/types/generic";
import CardComponent from "@/components/Card";
import NotFoundScreen from "./+not-found";
import TestForm from "@/components/TestForm";
import { EMPTY_TEST_SETTING, TestSettings } from "@/types/TestSettings";
import TestManager from "@/components/TestManager";
import { Card } from "@/types/Card";
import { getMatchingCardsForTest } from "@/utils/cardPicker";
import { useStore } from "@/providers/GlobalStore";

type localSearchParams = {};

const TestPage: React.FC = () => {
  // const {  } = useLocalSearchParams<localSearchParams>();
  const navigation = useNavigation();
  const { cards } = useStore();
  const [isTestSetupDone, setIsTestSetupDone] = useState(false);
  const [testSettings, setTestSettings] =
    useState<TestSettings>(EMPTY_TEST_SETTING);

  const [matchingCards, setMatchingCards] = useState<Card[]>([]);

  useEffect(() => {
    navigation.setOptions({ title: "", headerShown: false });
    setTestSettings({
      ...testSettings,
      selectedTags: [],
    });
  }, []);

  useEffect(() => {
    const list = getMatchingCardsForTest(cards, testSettings);
    setMatchingCards(list);
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
