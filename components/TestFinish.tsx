import { Card } from "@/types/Card";
import { CardMeta } from "@/types/TestSettings";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { KnowledgeLevel } from "../types/KnowledgeLevel";
import TestFinishRow from "./TestFinishRow";
import { container, margin, padding } from "@/constants/styles";
import ActionsBar, { FABProps } from "./ActionsBar";
import { getHomeHref } from "@/utils/links";

interface TestFinishProps {
  cards: Card[];
  cardsMeta: CardMeta[];
  onChangeKnowledgeLevel: (index: number, newKL: KnowledgeLevel) => void;
}

export default function TestFinish({
  cards,
  cardsMeta,
  onChangeKnowledgeLevel,
}: TestFinishProps) {
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const actionButtons: FABProps[] = [
    {
      icon: "check",
      href: getHomeHref(),
    },
    // TODO reset test
    // {
    //   icon: "arrow-u-right-bottom",
    // },
  ];

  useEffect(() => {
    let correct = 0;
    cardsMeta.forEach((cardMeta) => {
      if (cardMeta.success) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, [cardsMeta]);

  return (
    <View style={[margin.base2]}>
      <Text
        style={[padding.bottom, { alignSelf: "center" }]}
        variant="headlineLarge"
      >
        Test Is Done!
      </Text>
      <Text
        style={[padding.bottom3, { alignSelf: "center" }]}
        variant="headlineMedium"
      >
        You got {correctAnswers}/{cards.length}!
      </Text>
      <Text style={margin.bottom2} variant="titleMedium">
        Adjust Knowledge Level
      </Text>
      <View>
        <FlatList
          data={cards}
          keyExtractor={(card) => card.id.toString()}
          renderItem={({ item, index }) => (
            <TestFinishRow
              index={index}
              card={item}
              cardMeta={cardsMeta[index]}
              onChangeKnowledgeLevel={onChangeKnowledgeLevel}
            />
          )}
        />
      </View>
      <ActionsBar buttons={actionButtons} />
      {/* maybe this should not be action bar */}
    </View>
  );
}
