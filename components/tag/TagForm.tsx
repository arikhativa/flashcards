import { BaseCard, Tag } from '@/db/schema';
import { View } from 'react-native';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoSubmit } from '@/hooks/useAutoSubmit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import Field from '@/components/form/Field';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import useTagEdit from '@/hooks/mutation/useTagEdit';
import { BottomSheetList } from '@/components/BottomSheetList';
import { CardFilters, DEFAULT_CARD_FILTERS } from '@/hooks/query/useCardListFilters';
import CardFlashList from '@/components/card/CardFlashList';
import useCardList from '@/hooks/query/useCardList';
import MainScreen from '@/components/MainScreen';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { GraduationCap, Plus, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useMultiSelect } from '@/hooks/useMultiSelect';
import HoverIconButtonList from '@/components/HoverIconButtonList';
import HoverIconButton from '@/components/HoverIconButton';

const formSchema = z.object({
  name: z.string(),
  cardList: z.array(z.number()),
});

export type FormSchema = z.infer<typeof formSchema>;

interface Props {
  tag?: Tag;
  initialCardIds?: BaseCard['id'][];
}

const MAX_ITEMS_IN_SHEET = 9 as const;

export default function TagForm({ tag, initialCardIds }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentId, setCurrentId] = useState<number | null>(tag ? tag.id : null);

  const router = useRouter();

  const { selectedIds, isIdSelected, isMultiSelectOn, toggleIdSelection, clearSelectedIds } =
    useMultiSelect();

  const [cardFilters, setCardFilters] = useState<CardFilters>({
    ...DEFAULT_CARD_FILTERS,
  });

  const { data: cardList } = useCardList(cardFilters);

  const { update, create } = useTagEdit();
  const query = useQueryClient();

  const { setValue, trigger, control, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues: initialCardIds ? { cardList: initialCardIds } : toSchema(tag),
    resolver: zodResolver(formSchema),
  });

  const selectedCardIds = watch('cardList') || [];

  const filteredCards = useMemo(() => {
    return (
      cardList?.filter((t) => !selectedCardIds.includes(t.id)).slice(0, MAX_ITEMS_IN_SHEET) || []
    );
  }, [cardList]);

  const selectedCards = selectedCardIds
    .map((id) => cardList?.find((e) => e.id === id))
    .filter((e) => !!e);

  const toggleManyTags = (ids: number[]) => {
    const currentSet = new Set(selectedCardIds);

    ids.forEach((id) => {
      if (currentSet.has(id)) {
        // eslint-disable-next-line drizzle/enforce-delete-with-where
        currentSet.delete(id);
      } else {
        currentSet.add(id);
      }
    });

    setValue('cardList', [...currentSet], { shouldDirty: true });
    manualSubmit();
  };

  const { mutate } = useMutation({
    mutationFn: async (variables: FormSchema) => {
      if (currentId) {
        return update(currentId, variables);
      } else {
        return create(variables);
      }
    },
    onSuccess: (data) => {
      if (currentId === null && typeof data === 'number') {
        setCurrentId(data);
      }
      if (tag) {
        query.invalidateQueries({
          queryKey: queryKeyStore.tag.detail(tag.id).queryKey,
        });
      }
      query.invalidateQueries({ queryKey: queryKeyStore.tag.list._def });
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

  return (
    <View className="flex-1">
      <MainScreen className="flex flex-col gap-6">
        <View>
          <Field name="name" control={control} labelId={'tag-name'} labelText={'Name'} />
        </View>

        {currentId && (
          <View className="flex flex-1 flex-col gap-2">
            <View className="flex flex-row justify-between">
              <Label>Cards</Label>
              <Button
                variant={'outline'}
                size={'icon'}
                onPress={() => bottomSheetRef.current?.expand()}>
                <Icon as={Plus} />
              </Button>
            </View>
            <CardFlashList
              list={selectedCards}
              onPress={(obj) => {
                if (isMultiSelectOn) {
                  toggleIdSelection(obj.id);
                } else
                  router.navigate({
                    pathname: '/card/[id]',
                    params: { id: obj.id },
                  });
              }}
              onLongPress={(obj) => {
                toggleIdSelection(obj.id);
              }}
              getVariant={(obj) => (isIdSelected(obj.id) ? 'selected' : undefined)}
            />
          </View>
        )}

        <HoverIconButtonList>
          <HoverIconButton
            disabled={!isMultiSelectOn}
            variant={'destructive'}
            onPress={() => {
              toggleManyTags(selectedIds);
              clearSelectedIds();
            }}
            icon={X}
          />
          <HoverIconButton
            disabled={!isMultiSelectOn}
            onPress={() =>
              router.navigate({
                pathname: '/test/setup',
              })
            }
            icon={GraduationCap}
          />
        </HoverIconButtonList>
      </MainScreen>
      <BottomSheetList
        search={cardFilters.search}
        onChangeText={(search) => setCardFilters((prev) => ({ ...prev, search }))}
        ref={bottomSheetRef}>
        <CardFlashList
          list={filteredCards}
          onPress={(obj) => {
            toggleManyTags([obj.id]);
          }}
          getVariant={(obj) => {
            const wasAdded = selectedCardIds.includes(obj.id);
            return wasAdded ? undefined : 'muted';
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
