import { container, margin } from "@/constants/styles";
import { View, StyleSheet } from "react-native";
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
} from "react-native-paper";
import NumberInput from "./NumberInput";
import { EMPTY_TEST_SETTING, TestSetting, TestSide } from "@/types/TestSetting";
import { useEffect, useState } from "react";
import {
  Dropdown,
  MultiSelectDropdown,
  Option,
} from "react-native-paper-dropdown";
import { useStore } from "@/providers/GlobalStore";
import { isTestSide } from "@/utils/generic";
import InputHelper from "./InputHelper";

interface TestFormProps {}

enum OPTIONS_VALUES {
  Day = "Day",
  Week = "Week",
  Month = "Month",
}

const KNOWLEDGE_LEVEL = [
  { label: KnowledgeLevelName.Learning, value: KnowledgeLevel.Learning },
  {
    label: KnowledgeLevelName.GettingThere,
    value: KnowledgeLevel.GettingThere,
  },
  { label: KnowledgeLevelName.Confident, value: KnowledgeLevel.Confident },
];

const OPTIONS = [
  { label: "Last Day", value: OPTIONS_VALUES.Day },
  { label: "Last Week", value: OPTIONS_VALUES.Week },
  { label: "Last Month", value: OPTIONS_VALUES.Month },
];

interface CardsSideOptions {
  label: string;
  value: TestSide;
}

export default function TestForm({}: TestFormProps) {
  const { conf } = useStore();
  const [testSettings, setTestSettings] =
    useState<TestSetting>(EMPTY_TEST_SETTING);
  const [timeSelected, setTimeSelected] = useState<
    OPTIONS_VALUES | undefined
  >();
  const [kl, setKl] = useState<string[]>([]);
  const [cardsSideOptions, setCardsSideOptions] = useState<CardsSideOptions[]>(
    []
  );
  const [testSide, setTestSide] = useState<TestSide | undefined>();
  const [testSideError, setTestSideError] = useState<boolean>(false);

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
    console.log("testSettings", testSettings);
  }, [testSettings]);

  useEffect(() => {
    if (testSide) {
      setTestSettings({ ...testSettings, testSide: testSide });
      return;
    }
  }, [testSide]);

  useEffect(() => {
    if (!timeSelected) {
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
    kl.forEach((kl) => {
      setTestSettings((prev) => {
        return {
          ...prev,
          knowledgeLevels: {
            ...prev.knowledgeLevels,
            [kl]: true,
          },
        };
      });
    });
  }, [kl]);

  return (
    <View style={[container.flex1, margin.base2, margin.top4]}>
      <PaperCard>
        <PaperCard.Content>
          <Text style={margin.top2} variant="titleLarge">
            Test Setup
          </Text>
          <NumberInput
            min={1}
            max={100}
            onValueChange={(value) =>
              setTestSettings({ ...testSettings, numberOfCards: value })
            }
            label="How many cards to test?"
          ></NumberInput>
          <InputHelper>
            <Dropdown
              label="Cards from"
              options={OPTIONS}
              value={timeSelected}
              onSelect={setTimeSelected as (value?: string) => void}
            />
          </InputHelper>
          <InputHelper>
            <MultiSelectDropdown
              label="Knowledge Level"
              options={KNOWLEDGE_LEVEL}
              value={kl}
              onSelect={setKl}
            />
          </InputHelper>
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
          <Text variant="titleMedium">Chose cards from specific lists?</Text>
          <TextInput></TextInput>
        </PaperCard.Content>
      </PaperCard>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {},
});
