import { BaseTag, Card } from '@/db/schema';
import { Typography } from '@/components/ui/text';
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
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FlashList } from '@shopify/flash-list';
import TagTile from '@/components/tag/TagTile';
import useTagList, { TagFilters } from '@/hooks/query/useTagList';
import { cn, enumToSelectOption } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import SelectField from '@/components/form/SelectField';
import { knowledgeLevelEnum } from '@/lib/enums';

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

export default function CardForm({ card }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentId, setCurrentId] = useState<number | null>(card ? card.id : null);
  const [tagFilters, setTagFilters] = useState<TagFilters>({});
  const [tagToShow, setTagToShow] = useState<BaseTag[]>([]);

  const { data: conf } = useConfig();
  const { data: tagList } = useTagList(tagFilters);
  const { update, create } = useCardEdit();
  const query = useQueryClient();

  const { setValue, trigger, control, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues: toSchema(card),
    resolver: zodResolver(formSchema),
  });

  const filteredTags = useMemo(() => {
    const search = tagFilters.search?.trim() || '';

    if (!search) return tagToShow;

    return tagToShow.filter((tag) => tag.name?.toLowerCase().includes(search.toLowerCase()));
  }, [tagFilters?.search, tagToShow]);

  const selectedTagIds = watch('tagList') || [];

  const selectedTags = selectedTagIds
    .map((id) => tagList?.find((t) => t.id === id))
    .filter((tag) => !!tag);

  const tagsToRemove = tagList?.filter((t) => selectedTagIds.includes(t.id)) || [];
  const tagsToAdd = tagList?.filter((t) => !selectedTagIds.includes(t.id)) || [];

  const openAddTags = () => {
    bottomSheetRef.current?.expand();
    setTagToShow(tagsToAdd);
  };

  const openRemoveTags = () => {
    bottomSheetRef.current?.expand();
    setTagToShow(tagsToRemove);
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
          queryKey: queryKeyStore.cards.detail(String(currentId)).queryKey,
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

  return (
    <View className="flex-1">
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
        <SelectField
          control={control}
          options={enumToSelectOption(knowledgeLevelEnum)}
          labelId={'card-knowledgeLevel'}
          labelText={STRINGS.card.form.field.knowledgeLevel}
          name="knowledgeLevel"
        />
        {currentId && (
          <>
            <Label>Tags</Label>
            <View className="flex flex-row gap-4">
              {selectedTags.map((e) => (
                <TagTile key={e.id} tag={e} />
              ))}
            </View>

            <Button onPress={openRemoveTags}>
              <Typography>Remove Tags</Typography>
            </Button>

            <Button onPress={openAddTags}>
              <Typography>Add Tags</Typography>
            </Button>
          </>
        )}
      </View>

      <BottomSheet index={-1} snapPoints={['90%']} ref={bottomSheetRef} enablePanDownToClose={true}>
        <BottomSheetView className="flex-1">
          <View className="px-4 py-2">
            <BottomSheetTextInput
              placeholder="Search tags..."
              value={tagFilters.search}
              onChangeText={(search) => setTagFilters((prev) => ({ ...prev, search }))}
              autoCorrect={false}
              className="h-12 rounded-md border border-input bg-background px-3 py-2"
            />
          </View>

          <FlashList
            data={filteredTags}
            horizontal={false}
            numColumns={3}
            className="px-4"
            renderItem={({ item }) => {
              const wasAdded = selectedTagIds.includes(item.id);
              return (
                <TagTile
                  onPress={(tag) => {
                    toggleTag(tag);
                  }}
                  className={cn('m-2', wasAdded ? 'border-red-500' : '')}
                  tag={item}
                />
              );
            }}
            ListEmptyComponent={() => (
              <View className="items-center p-10">
                <Typography className="text-muted-foreground">{`No tags found for "${tagFilters.search}"`}</Typography>
              </View>
            )}
          />
        </BottomSheetView>
      </BottomSheet>
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
