import { Card } from '@/db/schema';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoSubmit } from '@/hooks/useAutoSubmit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import useConfig from '@/hooks/query/useConfig';
import { STRINGS } from '@/lib/strings';
import Field from '@/components/form/Field';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';

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
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data: conf } = useConfig();
  const { update } = useCardEdit();
  const query = useQueryClient();

  const { trigger, control, handleSubmit, watch } = useForm<FormSchema>({
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

  const openTags = () => {
    bottomSheetRef.current?.expand();
  };

  useAutoSubmit({
    trigger,
    watch,
    onSubmit: handleSubmit(onSubmit),
  });

  return (
    <GestureHandlerRootView className="flex-1 bg-green-300">
      <View>
        <Field
          name="sideA"
          control={control}
          labelId={'card-side-a'}
          labelText={conf?.sideA || ''}
        />
        <Field
          name="sideB"
          control={control}
          labelId={'card-side-b'}
          labelText={conf?.sideB || ''}
        />
        <Field
          name="comment"
          control={control}
          labelId={'card-comment'}
          labelText={STRINGS.card.form.field.comment}
        />

        <Button onPress={openTags}>
          <Text>Tags</Text>
        </Button>
      </View>

      <BottomSheet
        index={-1}
        snapPoints={['90%']}
        ref={bottomSheetRef}
        enablePanDownToClose={false}>
        <BottomSheetView className="flex-1 items-center p-20">
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

function toSchema(card?: Card): FormSchema {
  return {
    sideA: card?.sideA || '',
    sideB: card?.sideB || '',
    comment: card?.comment || '',
  };
}
