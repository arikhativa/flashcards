import { container, margin } from "@/constants/styles";
import { View } from "react-native";
import { FULL_UNSELECTED_KL, KnowledgeLevel } from "../types/KnowledgeLevel";
import { Card as PaperCard, Text, Chip } from "react-native-paper";
import NumberInput from "./NumberInput";
import { TestSettings, TestSide } from "@/types/TestSettings";
import { useEffect, useState } from "react";
import { Dropdown, MultiSelectDropdown } from "react-native-paper-dropdown";
import { useStore } from "@/providers/GlobalStore";
import { isTestSide } from "@/utils/generic";
import InputHelper from "./InputHelper";
import TagsSection from "./TagsSection";
import { Tag } from "@/types/Tag";
import { ListKLToSelectedKL } from "@/utils/knowledgeLevel";
import { Card } from "@/types/Card";
import ActionsBar, { FABProps } from "@/components/ActionsBar";
import {
  CardsSideOptions,
  KL_OPTIONS,
  OPTIONS_VALUES,
  TIME_OPTIONS,
} from "@/utils/testForm";

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

  const [testSide, setTestSide] = useState<TestSide | undefined>();
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
    if (preSelectedCards.length) {
      setTimeSelected(undefined);
      testSettings.numberOfCards = preSelectedCards.length;
    } else {
      setTimeSelected(OPTIONS_VALUES.Anytime);
      testSettings.numberOfCards = 10;
    }
    setTestSide("A");
    setTestSettings(testSettings);
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

  useEffect(() => {
    if (!timeSelected || timeSelected === OPTIONS_VALUES.Anytime) {
      setTestSettings({ ...testSettings, timeRange: {} });
      return;
    }

    let past = new Date();
    if (timeSelected === OPTIONS_VALUES.Day) {
      past.setHours(past.getHours() - 24);
    }
    if (timeSelected === OPTIONS_VALUES.Week) {
      past.setHours(past.getHours() - 24 * 7);
    }
    if (timeSelected === OPTIONS_VALUES.Month) {
      past.setHours(past.getHours() - 24 * 30);
    }
    setTestSettings({
      ...testSettings,
      timeRange: {
        startDate: past,
        endDate: new Date(),
      },
    });
  }, [timeSelected]);

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
            min={1}
            value={testSettings.numberOfCards}
            max={100}
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
              onSelect={(value?: string) => {
                setTimeSelected(value as OPTIONS_VALUES);
              }}
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
        title="Chose cards from specific lists"
        addTag={addTag}
        removeTag={removeTag}
        tags={testSettings.selectedTags}
        allTags={tags}
      />
      <ActionsBar buttons={actionButtons} isDisabled={() => !isFormValid()} />
    </View>
  );
}
