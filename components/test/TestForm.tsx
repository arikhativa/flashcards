import { Card } from '@/db/schema';
import { View } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { STRINGS } from '@/lib/strings';
import Field from '@/components/form/Field';
import { Button } from '@/components/ui/button';
import SelectField from '@/components/form/SelectField';
import { TestSettings, testSettingsSchema, useTest } from '@/components/provider/TestProvider';
import { CARD_SIDE_VALUE } from '@/lib/types';
import { Check } from 'lucide-react-native';

interface Props {
  card?: Card;
}

export default function TestForm({ card }: Props) {
  const { testSettings, setTestSettings } = useTest();
  const { data: conf } = useSuspenseConfig();

  const { control, handleSubmit } = useForm<TestSettings>({
    defaultValues: {
      numberOfCards: testSettings?.numberOfCards || 10, // conf.numberOfCards
      testSide: testSettings?.testSide || 'A', // conf.testSide
    },
    resolver: zodResolver(testSettingsSchema),
  });

  const onSubmit: SubmitHandler<TestSettings> = (data: TestSettings) => {
    console.log('A', data);
    setTestSettings(data);
  };

  return (
    <View>
      <SelectField
        name="testSide"
        options={CARD_SIDE_VALUE.map((e) => ({ value: e, label: e }))}
        labelId={'test-card-side'}
        labelText={STRINGS.test.form.field.testSide}
        control={control}
      />
      <Field
        name="numberOfCards"
        labelText={STRINGS.test.form.field.numberOfCards}
        labelId={'test-number-of-cards'}
        control={control}
      />
      <Button onPress={handleSubmit(onSubmit)}>
        <Check />
      </Button>
    </View>
  );
}
