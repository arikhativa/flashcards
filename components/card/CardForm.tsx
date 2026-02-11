import { Card } from '@/db/schema';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import * as z from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoSubmit } from '@/hooks/useAutoSubmit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import useConfig from '@/hooks/query/useConfig';
import { STRINGS } from '@/lib/strings';

const formSchema = z.object({
  sideA: z.string(),
  sideB: z.string(),
  comment: z.string(),
  //   knowledgeLevel: z.string(),
  //   createdAt: z.string(),
  //   updatedAt: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

interface Props {
  card: Card;
}

export default function CardForm({ card }: Props) {
  const { data: conf } = useConfig();
  const { update } = useCardEdit();
  const query = useQueryClient();
  const {
    trigger,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: toSchema(card),
    resolver: zodResolver(formSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (variables: FormSchema) => {
      return update(card.id, variables);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: queryKeyStore.cards.detail(String(card.id)).queryKey });
      query.invalidateQueries({ queryKey: queryKeyStore.cards.list._def });
    },
    onError: (e) => {
      console.error('mutate err: ', e);
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data: FormSchema) => {
    mutate(data);
  };

  useAutoSubmit({
    trigger,
    watch,
    onSubmit: handleSubmit(onSubmit),
  });

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            {/* TODO */}
            <Label nativeID="terms-checkbox" htmlFor="terms-checkbox">
              {conf?.sideA}
            </Label>
            <Input
              aria-labelledby="terms-checkbox"
              id="terms-checkbox"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="..."
            />
          </View>
        )}
        name="sideA"
      />
      {errors.sideA && <Text className="text-destructive">{errors.sideA.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>{conf?.sideB}</Text>
            <Input onChangeText={onChange} onBlur={onBlur} value={value} placeholder="..." />
          </View>
        )}
        name="sideB"
      />
      {errors.sideA && <Text className="text-destructive">{errors.sideA.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>{STRINGS.card.form.field.comment}</Text>
            <Input onChangeText={onChange} onBlur={onBlur} value={value} placeholder="..." />
          </View>
        )}
        name="comment"
      />
      {errors.sideB && <Text className="text-destructive">{errors.sideB.message}</Text>}
    </View>
  );
}

function toSchema(card?: Card): FormSchema {
  return {
    sideA: card?.sideA || '',
    sideB: card?.sideB || '',
    comment: card?.comment || '',
  };
}
