import { useEffect, useState } from "react";
import { Conf } from "@/types/Conf";
import { useStore } from "@/providers/GlobalStore";
import { Keyboard } from "react-native";
import { Button, Card, Text, Divider } from "react-native-paper";
import { View } from "react-native";
import { container, margin, padding } from "@/constants/styles";
import NumberInput from "@/components/shared/NumberInput";
import TextInput from "@/components/shared/CustomTextInput";
import { isInRange, isTestSide } from "@/utils/generic";
import {
  MAX_NUMBER_OF_CARDS,
  MAX_SIDE_LENGTH,
  MIN_NUMBER_OF_CARDS,
  MIN_SIDE_LENGTH,
} from "@/constants/general";
import { Dropdown, Option } from "react-native-paper-dropdown";
import { TestSide } from "@/types/TestSettings";
import InputHelper from "@/components/shared/InputHelper";
import { CardsSideOptions } from "@/utils/testForm";
import { isSortName } from "@/utils/sort";
import { SortNames } from "@/types/Sort";

export default function ConfScreen() {
  const { conf, confService } = useStore();

  const [localConf, setLocalConf] = useState<Conf>(conf);
  const [testSide, setTestSide] = useState<TestSide | undefined>(conf.testSide);
  const [sortName, setSortName] = useState<SortNames | undefined>(conf.sortBy);
  const [numberOfCardsError, setNumberOfCardsError] = useState<boolean>(false);
  const [cardsSideOptions, setCardsSideOptions] = useState<CardsSideOptions[]>(
    []
  );
  const [sortOptions, setSortOptions] = useState<Option[]>([]);

  useEffect(() => {
    setLocalConf(conf);

    if (!conf) {
      return;
    }
    updateSortOptions();
    updateSideOptions();
  }, [conf]);

  useEffect(() => {
    if (sortName) {
      setLocalConf({ ...localConf, sortBy: sortName });
    }
  }, [sortName]);

  useEffect(() => {
    if (testSide) {
      setLocalConf({ ...localConf, testSide: testSide });
    }
  }, [testSide]);

  const updateSortOptions = () => {
    const options: Option[] = [
      { label: `by ${conf.sideA}`, value: SortNames.SIDE_A_ABC },
      { label: `by ${conf.sideB}`, value: SortNames.SIDE_B_ABC },
      { label: `by Time`, value: SortNames.TIME },
      { label: `by Knowledge Level`, value: SortNames.KL },
    ];
    setSortOptions(options);
  };

  const updateSideOptions = () => {
    const cardsSideOptions: CardsSideOptions[] = [
      { label: conf.sideA, value: "A" },
      { label: conf.sideB, value: "B" },
      { label: "Both", value: "Both" },
    ];
    setCardsSideOptions(cardsSideOptions);
  };

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
      localConf.sortBy !== conf.sortBy ||
      localConf.testSide !== conf.testSide
    );
  };

  const isSideValid = (side: string): boolean => {
    return isInRange(side.length, MIN_SIDE_LENGTH, MAX_SIDE_LENGTH);
  };

  const isTestSideValid = (): boolean => {
    return !!testSide && isTestSide(testSide);
  };

  const isSortValid = (): boolean => {
    return !!sortName && isSortName(sortName);
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
      isSortValid() &&
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
              label="Default side to hide"
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
          <Divider />
          <Text variant="titleMedium" style={padding.bottom}>
            Default Sort
          </Text>
          <InputHelper error={!isSortValid() ? "Please select " : ""}>
            <Dropdown
              label="Default sort"
              options={sortOptions}
              value={sortName}
              error={!isSortValid()}
              onSelect={(value) => {
                if (!value || !isSortName(value)) {
                  setSortName(undefined);
                  return;
                }
                setSortName(value as SortNames);
              }}
            />
          </InputHelper>
          <NumberInput
            onError={setNumberOfCardsError}
            label="Number of cards"
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
