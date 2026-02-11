import { Card } from '@/db/schema';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import * as z from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoSubmit } from '@/hooks/useAutoSubmit';

const formSchema = z.object({
  sideA: z.string(),
  //   sideB: z.string(),
  //   knowledgeLevel: z.string(),
  //   createdAt: z.string(),
  //   updatedAt: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

interface Props {
  card: Card;
}

export default function CardForm({ card }: Props) {
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
      query.invalidateQueries({ queryKey: ['card'] });
    },
    onError: (e) => {
      console.error('mutate err: ', e);
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data: FormSchema) => {
    mutate(data);
  };

  const { manualSubmit } = useAutoSubmit({
    trigger,
    watch,
    onSubmit: handleSubmit(onSubmit),
  });

  const conft = 'SideA';

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View>
            <Text>{conft}</Text>
            <Input onChangeText={onChange} onBlur={onBlur} value={value} placeholder="..." />
          </View>
        )}
        name="sideA"
      />
      {errors.sideA && <Text className="text-destructive">{errors.sideA.message}</Text>}
      {/* <Button onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Button> */}
    </View>
  );
}

function toSchema(card?: Card): FormSchema {
  return { sideA: card?.sideA || '' };
}
