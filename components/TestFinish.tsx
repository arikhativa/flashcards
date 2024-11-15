import { Card } from "@/types/Card";
import { CardMeta } from "@/types/TestSettings";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { KnowledgeLevel } from "../types/KnowledgeLevel";
import TestFinishRow from "./TestFinishRow";
import { margin, padding } from "@/constants/styles";

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
    <View style={margin.base2}>
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
    </View>
  );
}
