import { container, margin } from "@/constants/styles";
import { View } from "react-native";
import { Card as PaperCard, Text, Chip } from "react-native-paper";
import { TestSettings, TestSide } from "@/types/TestSettings";
import { useEffect, useState } from "react";
import { Dropdown, MultiSelectDropdown } from "react-native-paper-dropdown";
import { useStore } from "@/providers/GlobalStore";
import { isTestSide } from "@/utils/generic";
import { Tag } from "@/types/Tag";
import { ListKLToSelectedKL } from "@/utils/knowledgeLevel";
import { Card } from "@/types/Card";
import ActionsBar, { FABProps } from "@/components/shared/ActionsBar";
import {
  CardsSideOptions,
  KL_OPTIONS,
  OPTIONS_VALUES,
  TIME_OPTIONS,
} from "@/utils/testForm";
import { MAX_NUMBER_OF_CARDS, MIN_NUMBER_OF_CARDS } from "@/constants/general";
import InputHelper from "../shared/InputHelper";
import { FULL_UNSELECTED_KL, KnowledgeLevel } from "@/types/KnowledgeLevel";
import NumberInput from "../shared/NumberInput";
import TagsSection from "../shared/TagsSection";

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
  const { conf, tags } = useStore();

  const actionButtons: FABProps[] = [
    {
      icon: "check",
      onPress: onSubmit,
    },
  ];

  const [testSide, setTestSide] = useState<TestSide | undefined>(
    testSettings.testSide
  );
  const [timeSelected, setTimeSelected] = useState<
    OPTIONS_VALUES | undefined
  >();

  const [kl, setKl] = useState<string[]>([
    KnowledgeLevel.Learning,
    KnowledgeLevel.GettingThere,
    KnowledgeLevel.Confident,
  ]);

  const [cardsSideOptions, setCardsSideOptions] = useState<CardsSideOptions[]>(
    []
  );

  useEffect(() => {
    setTimeSelected(OPTIONS_VALUES.Anytime);
  }, []);

  useEffect(() => {
    if (!conf) {
      return;
    }
    const cardsSideOptions: CardsSideOptions[] = [
      { label: conf.sideA, value: "A" },
      { label: conf.sideB, value: "B" },
      { label: "Both", value: "Both" },
    ];
    setCardsSideOptions(cardsSideOptions);
  }, [conf]);

  useEffect(() => {
    if (testSide) {
      setTestSettings({ ...testSettings, testSide: testSide });
      return;
    }
  }, [testSide]);

  const handleChangeTimeSelected = (value?: string) => {
    setTimeSelected(value as OPTIONS_VALUES);
    if (!value || value === OPTIONS_VALUES.Anytime) {
      setTestSettings({ ...testSettings, timeRange: {} });
      return;
    }

    let past = new Date();
    if (value === OPTIONS_VALUES.Day) {
      past.setHours(past.getHours() - 24);
    }
    if (value === OPTIONS_VALUES.Week) {
      past.setHours(past.getHours() - 24 * 7);
    }
    if (value === OPTIONS_VALUES.Month) {
      past.setHours(past.getHours() - 24 * 30);
    }
    setTestSettings({
      ...testSettings,
      timeRange: {
        startDate: past,
        endDate: new Date(),
      },
    });
  };

  useEffect(() => {
    if (kl.length === 0) {
      setTestSettings({ ...testSettings, knowledgeLevels: FULL_UNSELECTED_KL });
      return;
    }
    const klSelected = ListKLToSelectedKL(kl);
    setTestSettings({ ...testSettings, knowledgeLevels: klSelected });
  }, [kl]);

  const addTag = (tag: Tag) => {
    const list = testSettings.selectedTags;
    if (list.find((t) => t.id === tag.id)) {
      console.error("tag already exists");
      return;
    }
    list.push(tag);
    setTestSettings({ ...testSettings, selectedTags: list });
  };

  const removeTag = (tag: Tag) => {
    const list = testSettings.selectedTags;
    if (!list.find((t) => t.id === tag.id)) {
      console.error("tag does not exists: can't remove");
      return;
    }
    setTestSettings({
      ...testSettings,
      selectedTags: list.filter((t) => t.id !== tag.id),
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

  const isTimeSelectedValid = (): boolean => {
    return timeSelected !== undefined;
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Text variant="titleLarge">Test Setup</Text>
        <Chip style={{}} disabled mode="outlined">
          {matchingCards.length}
        </Chip>
      </View>
      <PaperCard>
        <PaperCard.Content>
          <InputHelper error={!isTestSideValid() ? "Please select a side" : ""}>
            <Dropdown
              label="Test by side"
              options={cardsSideOptions}
              value={testSide}
              error={!isTestSideValid()}
              onSelect={(value) => {
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
            onValueChange={(value) =>
              setTestSettings({ ...testSettings, numberOfCards: value })
            }
            label="How many cards to test?"
          ></NumberInput>
          <InputHelper
            error={
              !isTimeSelectedValid() ? "Please select a Knowledge Level" : ""
            }
          >
            <Dropdown
              disabled={!!preSelectedCards.length}
              error={!isTimeSelectedValid()}
              label="Cards from"
              options={TIME_OPTIONS}
              value={timeSelected}
              onSelect={handleChangeTimeSelected}
            />
          </InputHelper>
          <InputHelper
            error={
              !isKnowledgeLevelsValid() ? "Please select a Knowledge Level" : ""
            }
          >
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
        addTag={addTag}
        removeTag={removeTag}
        tags={testSettings.selectedTags}
        allTags={tags}
      />
      <ActionsBar buttons={actionButtons} isDisabled={() => !isFormValid()} />
    </View>
  );
}
