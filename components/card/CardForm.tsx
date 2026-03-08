import { BaseTag, Card } from '@/db/schema';
import { ScrollView, View } from 'react-native';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoSubmit } from '@/hooks/useAutoSubmit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { STRINGS } from '@/lib/strings';
import Field from '@/components/form/Field';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import TagTile from '@/components/tag/TagTile';
import useTagList from '@/hooks/query/useTagList';
import { knowledgeLevelEnum } from '@/lib/enums';
import CardSides from '@/components/card/CardSides';
import { X } from 'lucide-react-native';
import MainScreen from '@/components/MainScreen';
import { NAV_THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import KLInput from '@/components/form/KLInput';
import { TagFilters } from '@/hooks/query/useTagListFilters';
import TagFlashList from '@/components/tag/TagFlashList';
import { BottomSheetList } from '@/components/BottomSheetList';
import HorizontalScrollField from '@/components/form/HorizontalScrollField';

const formSchema = z.object({
  sideA: z.string(),
  sideB: z.string(),
  comment: z.string(),
  tagList: z.array(z.number()),
  knowledgeLevel: z.enum(knowledgeLevelEnum),
  //   createdAt: z.string(),
  //   updatedAt: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

interface Props {
  card?: Card;
}

const MAX_ITEMS_IN_SHEET = 20 as const;

export default function CardForm({ card }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentId, setCurrentId] = useState<number | null>(card ? card.id : null);
  const [tagFilters, setTagFilters] = useState<TagFilters>({});

  const { data: tagList } = useTagList(tagFilters);
  const { update, create } = useCardEdit();
  const query = useQueryClient();

  const { setValue, trigger, control, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues: toSchema(card),
    resolver: zodResolver(formSchema),
  });

  const selectedTagIds = watch('tagList') || [];

  const filteredTags = useMemo(() => {
    const tagToShow =
      tagList?.filter((t) => !selectedTagIds.includes(t.id)).slice(0, MAX_ITEMS_IN_SHEET) || [];
    const search = tagFilters.search?.trim() || '';

    if (!search) return tagToShow;

    return tagToShow.filter((tag) => tag.name?.toLowerCase().includes(search.toLowerCase()));
  }, [tagFilters?.search]);

  const selectedTags = selectedTagIds
    .map((id) => tagList?.find((t) => t.id === id))
    .filter((tag) => !!tag);

  const openAddTags = () => {
    bottomSheetRef.current?.expand();
  };

  const toggleTag = (tag: BaseTag) => {
    const isSelected = selectedTagIds.includes(tag.id);

    if (isSelected) {
      setValue(
        'tagList',
        selectedTagIds.filter((id) => id !== tag.id),
        { shouldDirty: true }
      );
    } else {
      setValue('tagList', [...selectedTagIds, tag.id], { shouldDirty: true });
    }
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
      if (card) {
        query.invalidateQueries({
          queryKey: queryKeyStore.cards.detail(card.id).queryKey,
        });
      }
      query.invalidateQueries({ queryKey: queryKeyStore.cards.list._def });
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

  const { colorScheme } = useColorScheme();
  const theme = NAV_THEME[colorScheme ?? 'light'];

  return (
    <View className="flex-1">
      <MainScreen>
        <ScrollView
          contentContainerClassName="flex flex-col gap-6 pb-20"
          showsVerticalScrollIndicator={false}>
          <CardSides
            knowledgeLevel={watch('knowledgeLevel')}
            customSideA={
              <Field
                inputClassName="text-center border-0 border-black border-b px-6"
                name="sideA"
                control={control}
              />
            }
            customSideB={
              <Field
                inputClassName="text-center border-0 border-black border-b px-6"
                name="sideB"
                control={control}
              />
            }
          />
          <Field
            isTextArea
            name="comment"
            control={control}
            labelId={'card-comment'}
            labelText={STRINGS.card.form.field.comment}
          />
          <KLInput
            control={control}
            labelId={'card-knowledgeLevel'}
            labelText={STRINGS.card.form.field.knowledgeLevel}
            name="knowledgeLevel"
          />
          {currentId && (
            <HorizontalScrollField label="Tags" onAdd={openAddTags}>
              {selectedTags.map((e) => (
                <TagTile
                  onPress={toggleTag}
                  key={e.id}
                  tag={e}
                  icon={X}
                  iconClassName={'text-primary-foreground'}
                />
              ))}
            </HorizontalScrollField>
          )}
        </ScrollView>
      </MainScreen>

      <BottomSheetList
        search={tagFilters.search}
        onChangeText={(search) => setTagFilters((prev) => ({ ...prev, search }))}
        ref={bottomSheetRef}>
        <TagFlashList
          tags={filteredTags}
          onPress={(tag) => {
            toggleTag(tag);
          }}
          getVariant={(tag) => {
            const wasAdded = selectedTagIds.includes(tag.id);
            return wasAdded ? undefined : 'outline';
          }}
        />
      </BottomSheetList>
    </View>
  );
}

function toSchema(card?: Card): FormSchema {
  return {
    sideA: card?.sideA || '',
    sideB: card?.sideB || '',
    knowledgeLevel: card?.knowledgeLevel || 'Learning',
    comment: card?.comment || '',
    tagList: card?.tagList?.map((t) => t.id) || [],
  };
}
