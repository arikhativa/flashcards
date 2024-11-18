import { useEffect, useState } from "react";
import { Conf } from "@/types/Conf";
import { useStore } from "@/providers/GlobalStore";
import { Keyboard } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { View } from "react-native";
import { container, margin, padding } from "@/constants/styles";
import NumberInput from "@/components/NumberInput";
import TextInput from "@/components/TextInput";
import { isInRange, isTestSide } from "@/utils/generic";
import {
  MAX_NUMBER_OF_CARDS,
  MAX_SIDE_LENGTH,
  MIN_NUMBER_OF_CARDS,
  MIN_SIDE_LENGTH,
} from "@/constants/general";
import { Dropdown } from "react-native-paper-dropdown";
import { TestSide } from "@/types/TestSettings";
import InputHelper from "@/components/InputHelper";
import { CardsSideOptions } from "@/utils/testForm";

export default function ConfScreen() {
  const { conf, confService } = useStore();

  const [localConf, setLocalConf] = useState<Conf>(conf);
  const [testSide, setTestSide] = useState<TestSide | undefined>(conf.testSide);
  const [numberOfCardsError, setNumberOfCardsError] = useState<boolean>(false);
  const [cardsSideOptions, setCardsSideOptions] = useState<CardsSideOptions[]>(
    []
  );

  useEffect(() => {
    setLocalConf(conf);

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
      setLocalConf({ ...localConf, testSide: testSide });
    }
  }, [testSide]);

  const handleSubmit = async () => {
    Keyboard.dismiss(); // TODO not sure if this is needed
    await confService.update(localConf);
  };

  const handleInputChange = (field: keyof Conf, value: string | number) => {
    setLocalConf({ ...localConf, [field]: value });
  };

  const isDirty = (): boolean => {
    return (
      localConf.sideA !== conf.sideA ||
      localConf.sideB !== conf.sideB ||
      localConf.numberOfCards !== conf.numberOfCards ||
      localConf.testSide !== conf.testSide
    );
  };

  const isSideValid = (side: string): boolean => {
    return isInRange(side.length, MIN_SIDE_LENGTH, MAX_SIDE_LENGTH);
  };

  const isTestSideValid = (): boolean => {
    return !!testSide && isTestSide(testSide);
  };

  const isNumberOfCardsValid = (): boolean => {
    return (
      !numberOfCardsError &&
      isInRange(
        localConf.numberOfCards,
        MIN_NUMBER_OF_CARDS,
        MAX_NUMBER_OF_CARDS
      )
    );
  };

  const isFormValid = (): boolean => {
    return (
      isSideValid(localConf.sideA) &&
      isSideValid(localConf.sideB) &&
      isTestSideValid() &&
      isNumberOfCardsValid()
    );
  };

  return (
    <View style={[container.center, padding.x]}>
      <Card style={[margin.base2]}>
        <Card.Title title="Settings" />
        <Card.Content style={padding.bottom}>
          <Text variant="titleMedium" style={padding.bottom}>
            Names on Cards
          </Text>
          <TextInput
            label="Side A"
            value={localConf.sideA}
            onValueChange={(text) => handleInputChange("sideA", text)}
          />
          <TextInput
            label="Side B"
            value={localConf.sideB}
            onValueChange={(text) => handleInputChange("sideB", text)}
          />
          <Text variant="titleMedium" style={padding.bottom}>
            Default Values of Test Setup
          </Text>
          <InputHelper error={!isTestSideValid() ? "Please select a side" : ""}>
            <Dropdown
              label="Default Test Side"
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
            onError={setNumberOfCardsError}
            label="Number of Cards"
            min={MIN_NUMBER_OF_CARDS}
            max={MAX_NUMBER_OF_CARDS}
            value={localConf.numberOfCards}
            onValueChange={(i) => handleInputChange("numberOfCards", i)}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode={"contained"}
            onPress={handleSubmit}
            disabled={!isDirty() || !isFormValid()}
          >
            Save
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
