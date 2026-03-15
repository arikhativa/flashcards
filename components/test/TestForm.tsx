import { useForm, SubmitHandler } from 'react-hook-form';
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
import { testCardSideEnum } from '@/lib/enums';
import { Typography } from '@/components/ui/text';

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

  const { control, handleSubmit } = useForm<TestSettings>({
    defaultValues: {
      numberOfCards: testSettings?.numberOfCards || 10, // conf.numberOfCards
      testSide: testSettings?.testSide || 'A',
      cardIdsToTest,
      tagIdsToTest,
    },
    resolver: zodResolver(testSettingsSchema),
  });

  const onSubmit: SubmitHandler<TestSettings> = (data: TestSettings) => {
    setTestSettings(data);
    router.navigate({
      pathname: '/test/active',
    });
  };

  return (
    <MainScreen>
      <SelectField
        name="testSide"
        options={options}
        labelId={'test-card-side'}
        labelText={STRINGS.test.form.field.testSide}
        control={control}
      />
      {!cardIdsToTest && !tagIdsToTest && (
        <Field
          name="numberOfCards"
          labelText={STRINGS.test.form.field.numberOfCards}
          labelId={'test-number-of-cards'}
          control={control}
        />
      )}
      <Button onPress={handleSubmit(onSubmit)}>
        <Typography>Start Test</Typography>
      </Button>
    </MainScreen>
  );
}
