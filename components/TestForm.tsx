import { container, margin } from "@/constants/styles";
import { View, StyleSheet, Platform } from "react-native";
import {
  FULL_UNSELECTED_KL,
  KnowledgeLevel,
  KnowledgeLevelName,
} from "../types/KnowledgeLevel";
import {
  Card as PaperCard,
  Text,
  TextInput,
  Button,
  Divider,
  FAB,
} from "react-native-paper";
import NumberInput from "./NumberInput";
import { TestSettings, TestSide } from "@/types/TestSettings";
import { useEffect, useState } from "react";
import {
  Dropdown,
  MultiSelectDropdown,
  Option,
} from "react-native-paper-dropdown";
import { useStore } from "@/providers/GlobalStore";
import { isTestSide } from "@/utils/generic";
import InputHelper from "./InputHelper";
import TagsSection from "./TagsSection";
import { Tag } from "@/types/Tag";
import { ListKLToSelectedKL } from "@/utils/knowledgeLevel";

enum OPTIONS_VALUES {
  Day = "Day",
  Week = "Week",
  Month = "Month",
  Anytime = "Anytime",
}

const KNOWLEDGE_LEVEL = [
  { label: KnowledgeLevelName.Learning, value: KnowledgeLevel.Learning },
  {
    label: KnowledgeLevelName.GettingThere,
    value: KnowledgeLevel.GettingThere,
  },
  { label: KnowledgeLevelName.Confident, value: KnowledgeLevel.Confident },
];

const TimeOptions = [
  { label: "Last Day", value: OPTIONS_VALUES.Day },
  { label: "Last Week", value: OPTIONS_VALUES.Week },
  { label: "Last Month", value: OPTIONS_VALUES.Month },
  { label: "Anytime", value: OPTIONS_VALUES.Anytime },
];

interface CardsSideOptions {
  label: string;
  value: TestSide;
}

interface TestFormProps {
  testSettings: TestSettings;
  setTestSettings: (testSettings: TestSettings) => void;
  onSubmit?: () => void;
}

export default function TestForm({
  testSettings,
  setTestSettings,
  onSubmit,
}: TestFormProps) {
  const { conf, tags } = useStore();
  const [timeSelected, setTimeSelected] = useState<OPTIONS_VALUES | undefined>(
    OPTIONS_VALUES.Anytime // TODO this is a bug that shows "Anytime" after a deselect all
  );

  const [kl, setKl] = useState<string[]>([
    KnowledgeLevel.Learning,
    KnowledgeLevel.GettingThere,
    KnowledgeLevel.Confident,
  ]);
  const [cardsSideOptions, setCardsSideOptions] = useState<CardsSideOptions[]>(
    []
  );
  const [testSide, setTestSide] = useState<TestSide | undefined>("A");
  const [testSideError, setTestSideError] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [KLError, setKLError] = useState<boolean>(false);
  const [timeSelectedError, setTimeSelectedError] = useState<boolean>(false);

  // TODO this is part of the bug above
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
    if (testSettings.numberOfCards < 1) {
      setIsFormValid(false);
      return;
    }
    if (testSide === undefined) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
  }, [testSettings, testSide]);

  useEffect(() => {
    if (testSide) {
      setTestSettings({ ...testSettings, testSide: testSide });
      return;
    }
  }, [testSide]);

  useEffect(() => {
    if (!timeSelected) {
      setTestSettings({ ...testSettings, timeRange: {} });
      setTimeSelectedError(true);
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
    setTimeSelectedError(false);
  }, [timeSelected]);

  useEffect(() => {
    if (kl.length === 0) {
      setTestSettings({ ...testSettings, knowledgeLevels: FULL_UNSELECTED_KL });
      setKLError(true);
      return;
    }
    const klSelected = ListKLToSelectedKL(kl);
    setTestSettings({ ...testSettings, knowledgeLevels: klSelected });
    setKLError(false);
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

  return (
    <View style={[container.flex1, margin.base2]}>
      <Text style={margin.y2} variant="titleLarge">
        Test Setup
      </Text>
      <PaperCard>
        <PaperCard.Content>
          <NumberInput
            min={1}
            max={100}
            onValueChange={(value) =>
              setTestSettings({ ...testSettings, numberOfCards: value })
            }
            label="How many cards to test?"
          ></NumberInput>
          <InputHelper error={testSideError ? "Please select a side" : ""}>
            <Dropdown
              label="Test by side"
              options={cardsSideOptions}
              value={testSide}
              error={testSideError}
              onSelect={(value) => {
                if (!value) {
                  // TODO this on submit
                  setTestSide(undefined);
                  setTestSideError(true);
                  return;
                }
                if (isTestSide(value)) {
                  setTestSide(value as TestSide);
                  setTestSideError(false);
                }
              }}
            />
          </InputHelper>
          <InputHelper
            error={timeSelectedError ? "Please select a Knowledge Level" : ""}
          >
            <Dropdown
              label="Cards from"
              options={TimeOptions}
              value={timeSelected}
              onSelect={(value?: string) => {
                if (!value) {
                  setTimeSelected(undefined);
                  return;
                }
                setTimeSelected(value as OPTIONS_VALUES);
              }}
            />
          </InputHelper>
          <InputHelper error={KLError ? "Please select a Knowledge Level" : ""}>
            <MultiSelectDropdown
              label="Knowledge Level"
              options={KNOWLEDGE_LEVEL}
              value={kl}
              onSelect={setKl}
            />
          </InputHelper>
        </PaperCard.Content>
      </PaperCard>
      <TagsSection
        style={margin.top2}
        title="Chose cards from specific lists"
        addTag={addTag}
        removeTag={removeTag}
        tags={testSettings.selectedTags}
        allTags={tags}
      />
      <FAB
        style={container.buttonBottomRight}
        disabled={!isFormValid}
        icon="check"
        onPress={onSubmit}
      />
    </View>
  );
}
