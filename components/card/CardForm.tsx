import { BaseTag, Card } from '@/db/schema';
import { Typography } from '@/components/ui/text';
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
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FlashList } from '@shopify/flash-list';
import TagTile from '@/components/tag/TagTile';
import useTagList, { TagFilters } from '@/hooks/query/useTagList';
import { enumToSelectOption } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import SelectField from '@/components/form/SelectField';
import { knowledgeLevelEnum } from '@/lib/enums';
import CardSides from '@/components/card/CardSides';
import { Icon } from '@/components/ui/icon';
import { Plus, X } from 'lucide-react-native';
import { CardContent, CardRoot } from '@/components/ui/card';
import MainScreen from '@/components/MainScreen';
import { NAV_THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import KLInput from '@/components/form/KLInput';

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
            <View className="flex flex-col gap-2">
              <View className="flex flex-row justify-between">
                <Label>Tags</Label>
                <Button variant={'outline'} size={'icon'} onPress={openAddTags}>
                  <Icon as={Plus} />
                </Button>
              </View>
              <CardRoot>
                <CardContent className="px-0">
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex flex-row gap-4 px-2">
                    {selectedTags.map((e) => (
                      <TagTile
                        onPress={toggleTag}
                        key={e.id}
                        tag={e}
                        icon={X}
                        iconClassName={'text-primary-foreground'}
                      />
                    ))}
                  </ScrollView>
                </CardContent>
              </CardRoot>
            </View>
          )}
        </ScrollView>
      </MainScreen>

      <BottomSheet
        index={-1}
        snapPoints={['90%']}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backgroundStyle={{
          borderTopWidth: 0.5,
          borderWidth: 0.5,
          borderColor: 'var(--border-color)',
        }}>
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
                <View className="flex w-fit items-center">
                  <TagTile
                    onPress={(tag) => {
                      toggleTag(tag);
                    }}
                    variant={wasAdded ? undefined : 'outline'}
                    className="m-2"
                    tag={item}
                  />
                </View>
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
