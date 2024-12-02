import React from 'react';
import {Card} from '../../types/Card';
import {CardMeta} from '../../types/TestSettings';
import {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {KnowledgeLevel} from '../../types/KnowledgeLevel';
import {margin, padding} from '../../constants/styles';
import {Card as PaperCard} from 'react-native-paper';
import {useVisible} from '../../hooks/useVisible';
import TestFinishDialog from './TestFinishDialog';
import {useNavigation} from '@react-navigation/native';
import {MainStackProp} from '../../navigation/MainStack';

interface TestFinishProps {
  scrollToPage: (index: number) => void;
  cards: Card[];
  cardsMeta: CardMeta[];
  onChangeKnowledgeLevel: (index: number, newKL: KnowledgeLevel) => void;
  onRetakeTest: (list: Card[]) => void;
}

export default function TestFinish({
  scrollToPage,
  cards,
  cardsMeta,
  onChangeKnowledgeLevel,
  onRetakeTest,
}: TestFinishProps) {
  const navigation = useNavigation<MainStackProp>();
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const {visible, toggleVisible} = useVisible();

  useEffect(() => {
    let correct = 0;
    cardsMeta.forEach(cardMeta => {
      if (cardMeta.success) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
  }, [cardsMeta]);

  return (
    <View style={[margin.base2]}>
      <PaperCard>
        <PaperCard.Content>
          <Text
            style={[padding.bottom, {alignSelf: 'center'}]}
            variant="headlineLarge">
            Test Is Done!
          </Text>
          <Text style={[{alignSelf: 'center'}]} variant="headlineMedium">
            You got {correctAnswers}/{cards.length}!
          </Text>
        </PaperCard.Content>
      </PaperCard>
      <View
        style={{
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
        }}>
        <Button
          mode="contained"
          onPress={() => {
            Keyboard.dismiss();
            toggleVisible();
          }}>
          View Test
        </Button>
        <Button mode="elevated" onPress={() => onRetakeTest(cards)}>
          Retake Test
        </Button>
        <Button
          mode="elevated"
          onPress={() => {
            navigation.navigate('Home');
          }}>
          Done
        </Button>
      </View>
      <TestFinishDialog
        scrollToPage={scrollToPage}
        cards={cards}
        cardsMeta={cardsMeta}
        onChangeKnowledgeLevel={onChangeKnowledgeLevel}
        visible={visible}
        onDismiss={toggleVisible}
      />
    </View>
  );
}
