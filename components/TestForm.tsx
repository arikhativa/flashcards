import { container, margin } from "@/constants/styles";
import { View, StyleSheet } from "react-native";
import { KnowledgeLevel } from "../types/KnowledgeLevel";
import {
  Card as PaperCard,
  Text,
  TextInput,
  Divider,
} from "react-native-paper";
import NumberInput from "./NumberInput";
import { EMPTY_TEST_SETTING, TestSetting } from "@/types/TestSetting";
import { useState } from "react";

interface TestFormProps {}

export default function TestForm({}: TestFormProps) {
  const [testSettings, setTestSettings] =
    useState<TestSetting>(EMPTY_TEST_SETTING);

  return (
    <View style={[container.flex1, margin.base2]}>
      <PaperCard>
        <PaperCard.Content>
          <Text variant="titleLarge">Test Setup</Text>
          <Divider />
          <NumberInput
            min={1}
            max={100}
            onValueChange={(value) =>
              setTestSettings({ ...testSettings, numberOfCards: value })
            }
            label="How many cards to test?"
          ></NumberInput>
          <Text variant="titleMedium">time range</Text>
          <TextInput></TextInput>
          <Text variant="titleMedium">Chose cards from specific lists?</Text>
          <TextInput></TextInput>
          <Text variant="titleMedium">Include these knowledge level:</Text>
          <TextInput></TextInput>
          <Text variant="titleMedium">Test by side A, B or Both?</Text>
          <TextInput></TextInput>
        </PaperCard.Content>
      </PaperCard>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {},
});
