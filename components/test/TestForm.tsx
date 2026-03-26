import { useForm, SubmitHandler, Controller, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { STRINGS } from '@/lib/strings';
import Field from '@/components/form/Field';
import { Button } from '@/components/ui/button';
import SelectField from '@/components/form/SelectField';
import { TestSettings, testSettingsSchema, useTest } from '@/components/provider/TestProvider';
import { useRouter } from 'expo-router';
import MainScreen from '@/components/MainScreen';
import { useMemo } from 'react';
import { knowledgeLevelEnumArray, knowledgeLevelText, testCardSideEnum } from '@/lib/enums';
import { Typography } from '@/components/ui/text';
import { View } from 'react-native';
import { TimeRangeSelect } from '@/components/form/TimeRangeSelect';
import { Label } from '@/components/ui/label';
import SelectEnumField from '@/components/form/SelectEnumField';

type Props =
  | {
      cardIdsToTest?: undefined;
      tagIdsToTest?: undefined;
    }
  | {
      cardIdsToTest?: number[];
      tagIdsToTest?: undefined;
    }
  | {
      cardIdsToTest?: undefined;
      tagIdsToTest?: number[];
    };

export default function TestForm({ cardIdsToTest, tagIdsToTest }: Props) {
  const router = useRouter();

  const { testSettings, setTestSettings } = useTest();
  const { data: conf } = useSuspenseConfig();

  const options = useMemo(() => {
    return [
      { value: testCardSideEnum.A, label: conf.sideA },
      { value: testCardSideEnum.B, label: conf.sideB },
      { value: testCardSideEnum.Both, label: testCardSideEnum.Both },
    ];
  }, [conf]);

  const defaultValues: TestSettings = {
    numberOfCards: testSettings?.numberOfCards || 10, // conf.numberOfCards
    testSide: testSettings?.testSide || 'A',
    range: {
      dateFrom: null,
      dateTo: null,
    },
    knowledgeLevelList: [...knowledgeLevelEnumArray],
    cardIdsToTest,
    tagIdsToTest,
  };

  const { control, handleSubmit } = useForm<TestSettings>({
    defaultValues,
    resolver: zodResolver(testSettingsSchema),
  });

  const onSubmit: SubmitHandler<TestSettings> = (data: TestSettings) => {
    setTestSettings(data);
    router.navigate({
      pathname: '/test/active',
    });
  };

  const rangeLabel = STRINGS.test.form.field.range;

  return (
    <MainScreen className="gap-6">
      <SelectField
        name="testSide"
        options={options}
        labelId={'test-card-side'}
        labelText={STRINGS.test.form.field.testSide}
        control={control}
      />
      {!cardIdsToTest && !tagIdsToTest && (
        <>
          <Field
            name="numberOfCards"
            labelText={STRINGS.test.form.field.numberOfCards}
            labelId={'test-number-of-cards'}
            control={control}
          />

          <Controller
            name={'range'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <View className="flex flex-col gap-2">
                  <Label nativeID={rangeLabel} htmlFor={rangeLabel}>
                    {rangeLabel}
                  </Label>
                  <TimeRangeSelect value={value} onChange={onChange} />
                </View>
              );
            }}
          />

          <SelectEnumField
            name="knowledgeLevelList"
            control={control}
            labelEnum={knowledgeLevelText}
            labelId="test-knowledge-level-list"
            labelText={STRINGS.test.form.field.knowledgeLevelList}
          />
        </>
      )}
      <View className="flex-1"></View>
      <Button className="mb-10" onPress={handleSubmit(onSubmit)}>
        <Typography>Start Test</Typography>
      </Button>
    </MainScreen>
  );
}
