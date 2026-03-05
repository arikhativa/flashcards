import { BaseCard, Tag } from '@/db/schema';
import { View } from 'react-native';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoSubmit } from '@/hooks/useAutoSubmit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import useConfig from '@/hooks/query/useConfig';
import Field from '@/components/form/Field';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import useTagEdit from '@/hooks/mutation/useTagEdit';
import { BottomSheetList } from '@/components/BottomSheetList';
import { CardFilters, DEFAULT_CARD_FILTERS } from '@/hooks/query/useCardListFilters';
import CardFlashList from '@/components/card/CardFlashList';
import useCardList from '@/hooks/query/useCardList';
import HorizontalScrollField from '@/components/form/HorizontalScrollField';
import CardTile from '@/components/card/CardTile';

const formSchema = z.object({
  name: z.string(),
  cardList: z.array(z.number()),
});

export type FormSchema = z.infer<typeof formSchema>;

interface Props {
  current: Tag;
}

export default function TagForm({ current }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [cardFilters, setCardFilters] = useState<CardFilters>({
    ...DEFAULT_CARD_FILTERS,
    excludeTagIds: current?.id ? [current.id] : undefined,
  });

  const { data: conf } = useConfig();
  const { data: cardList } = useCardList(cardFilters);
  const { update } = useTagEdit();
  const query = useQueryClient();

  const { setValue, trigger, control, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues: toSchema(current),
    resolver: zodResolver(formSchema),
  });

  const selectedCardIds = watch('cardList') || [];

  const filteredCards = useMemo(() => {
    return cardList?.filter((t) => !selectedCardIds.includes(t.id)) || [];
  }, []);

  const selectedCards = selectedCardIds
    .map((id) => cardList?.find((e) => e.id === id))
    .filter((tag) => !!tag);

  const toggleTag = (obj: BaseCard) => {
    const isSelected = selectedCardIds.includes(obj.id);

    if (isSelected) {
      setValue(
        'cardList',
        selectedCardIds.filter((id) => id !== obj.id),
        { shouldDirty: true }
      );
    } else {
      setValue('cardList', [...selectedCardIds, obj.id], { shouldDirty: true });
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (variables: FormSchema) => {
      return update(current.id, variables);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: queryKeyStore.tag.detail(String(current.id)).queryKey });
      query.invalidateQueries({ queryKey: queryKeyStore.tag.list._def });
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
    <View className="flex-1">
      <View>
        <Field name="name" control={control} labelId={'tag-name'} labelText={'Name'} />
      </View>

      {current.id && (
        <HorizontalScrollField label="Cards" onAdd={() => bottomSheetRef.current?.expand()}>
          {selectedCards.map((e) => (
            <CardTile onPress={toggleTag} key={e.id} card={e} />
          ))}
        </HorizontalScrollField>
      )}

      <BottomSheetList
        search={cardFilters.search}
        onChangeText={(search) => setCardFilters((prev) => ({ ...prev, search }))}
        ref={bottomSheetRef}>
        <CardFlashList
          list={filteredCards}
          onPress={(tag) => {
            toggleTag(tag);
          }}
        />
      </BottomSheetList>
    </View>
  );
}

function toSchema(obj?: Tag): FormSchema {
  return {
    name: obj?.name || '',
    cardList: obj?.cardList?.map((t) => t.id) || [],
  };
}
