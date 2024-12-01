import {container, margin} from '../constants/styles';
import {View} from 'react-native';
import {Card as PaperCard, Text, Chip} from 'react-native-paper';
import {TestSettings, TestSide} from '../types/TestSettings';
import {useEffect, useState} from 'react';
import {Dropdown, MultiSelectDropdown} from 'react-native-paper-dropdown';
import {useStore} from '../providers/GlobalStore';
import {isTestSide} from '../utils/generic';
import {Tag} from '../types/Tag';
import {ListKLToSelectedKL} from '../utils/knowledgeLevel';
import {Card} from '../types/Card';
import ActionsBar, {MainButtons} from '../components/shared/ActionsBar';
import {
  CardsSideOptions,
  KL_OPTIONS,
  OPTIONS_VALUES,
  TIME_OPTIONS,
} from '../utils/testForm';
import {MAX_NUMBER_OF_CARDS, MIN_NUMBER_OF_CARDS} from '../constants/general';
import InputHelper from '../shared/InputHelper';
import {FULL_UNSELECTED_KL, KnowledgeLevel} from '../types/KnowledgeLevel';
import NumberInput from '../shared/NumberInput';
import TagsSection from '../shared/TagsSection';
import {useTimeDropdown} from '../hooks/useTimeDropdown';

interface TestFormProps {
  preSelectedCards: number[];
  matchingCards: Card[];
  testSettings: TestSettings;
  setTestSettings: (testSettings: TestSettings) => void;
  onSubmit: () => void;
}

export default function TestForm({
  preSelectedCards,
  matchingCards,
  testSettings,
  setTestSettings,
  onSubmit,
}: TestFormProps) {
  const {conf, tags} = useStore();

  const actionButtons: MainButtons = {
    a: {
      icon: 'check',
      onPress: onSubmit,
    },
  };

  const [testSide, setTestSide] = useState<TestSide | undefined>(
    testSettings.testSide,
  );

  const {timeSelected, setTimeSelectedWrapper, isTimeSelectedValid, range} =
    useTimeDropdown();

  const [kl, setKl] = useState<string[]>([
    KnowledgeLevel.Learning,
    KnowledgeLevel.GettingThere,
    KnowledgeLevel.Confident,
  ]);

  const [cardsSideOptions, setCardsSideOptions] = useState<CardsSideOptions[]>(
    [],
  );

  useEffect(() => {
    setTimeSelectedWrapper(OPTIONS_VALUES.Anytime);
  }, []);

  useEffect(() => {
    setTestSettings({...testSettings, timeRange: range});
  }, [range]);

  useEffect(() => {
    if (!conf) {
      return;
    }
    const cardsSideOptions: CardsSideOptions[] = [
      {label: conf.sideA, value: 'A'},
      {label: conf.sideB, value: 'B'},
      {label: 'Both', value: 'Both'},
    ];
    setCardsSideOptions(cardsSideOptions);
  }, [conf]);

  useEffect(() => {
    if (testSide) {
      setTestSettings({...testSettings, testSide: testSide});
      return;
    }
  }, [testSide]);

  useEffect(() => {
    if (kl.length === 0) {
      setTestSettings({...testSettings, knowledgeLevels: FULL_UNSELECTED_KL});
      return;
    }
    const klSelected = ListKLToSelectedKL(kl);
    setTestSettings({...testSettings, knowledgeLevels: klSelected});
  }, [kl]);

  const setTags = (list: Tag[]) => {
    let newList: Tag[] = [];

    list.forEach(e => {
      newList.push(e);
    });
    setTestSettings({...testSettings, selectedTags: newList});
  };

  const removeTag = (tag: Tag) => {
    const list = testSettings.selectedTags;
    if (!list.find(t => t.id === tag.id)) {
      console.error("tag does not exists: can't remove");
      return;
    }
    setTestSettings({
      ...testSettings,
      selectedTags: list.filter(t => t.id !== tag.id),
    });
  };

  const isMatchingCardsValid = (): boolean => {
    return matchingCards.length > 1;
  };

  const isNumberOfCardsValid = (): boolean => {
    return testSettings.numberOfCards > 1;
  };

  const isKnowledgeLevelsValid = (): boolean => {
    return kl.length > 0;
  };

  const isTestSideValid = (): boolean => {
    return testSide !== undefined;
  };

  const isFormValid = (): boolean => {
    return (
      isNumberOfCardsValid() &&
      isMatchingCardsValid() &&
      isKnowledgeLevelsValid() &&
      isTimeSelectedValid() &&
      isTestSideValid()
    );
  };

  return (
    <View style={[container.flex1, margin.base2]}>
      <View
        style={[
          margin.y2,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <Text variant="titleLarge">Test Setup</Text>
        <Chip style={{}} disabled mode="outlined">
          {matchingCards.length}
        </Chip>
      </View>
      <PaperCard>
        <PaperCard.Content>
          <InputHelper error={!isTestSideValid() ? 'Please select a side' : ''}>
            <Dropdown
              label="Choose side to hide"
              options={cardsSideOptions}
              value={testSide}
              error={!isTestSideValid()}
              onSelect={value => {
                if (!value || !isTestSide(value)) {
                  setTestSide(undefined);
                  return;
                }
                setTestSide(value as TestSide);
              }}
            />
          </InputHelper>
          <NumberInput
            disabled={!!preSelectedCards.length}
            min={MIN_NUMBER_OF_CARDS}
            max={MAX_NUMBER_OF_CARDS}
            value={testSettings.numberOfCards}
            onValueChange={value =>
              setTestSettings({...testSettings, numberOfCards: value})
            }
            label="How many cards to test?"
          />
          <InputHelper
            error={
              !isTimeSelectedValid() ? 'Please select a Time' : '' // TODO test is not good
            }>
            <Dropdown
              disabled={!!preSelectedCards.length}
              error={!isTimeSelectedValid()}
              label="Cards from"
              options={TIME_OPTIONS}
              value={timeSelected}
              onSelect={setTimeSelectedWrapper}
            />
          </InputHelper>
          <InputHelper
            error={
              !isKnowledgeLevelsValid() ? 'Please select a Knowledge Level' : ''
            }>
            <MultiSelectDropdown
              disabled={!!preSelectedCards.length}
              error={!isKnowledgeLevelsValid()}
              label="Knowledge Level"
              options={KL_OPTIONS}
              value={kl}
              onSelect={setKl}
            />
          </InputHelper>
        </PaperCard.Content>
      </PaperCard>
      <TagsSection
        disabled={!!preSelectedCards.length}
        style={margin.top2}
        title="Choose cards from specific lists"
        setTags={setTags}
        removeTag={removeTag}
        tags={testSettings.selectedTags}
      />
      <ActionsBar buttons={actionButtons} isDisabled={() => !isFormValid()} />
    </View>
  );
}
