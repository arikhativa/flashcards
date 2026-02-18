import { Tag } from '@/db/schema';
import { View } from 'react-native';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAutoSubmit } from '@/hooks/useAutoSubmit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import useConfig from '@/hooks/query/useConfig';
import Field from '@/components/form/Field';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import useTagEdit from '@/hooks/mutation/useTagEdit';

const formSchema = z.object({
  name: z.string(),
  // cardList: z.array(z.number()),
});

export type FormSchema = z.infer<typeof formSchema>;

interface Props {
  current: Tag;
}

export default function TagForm({ current }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // const [tagFilters, setTagFilters] = useState<TagFilters>({});
  // const [tagToShow, setTagToShow] = useState<BaseTag[]>([]);

  const { data: conf } = useConfig();
  // const { data: tagList } = useTagList(tagFilters);
  const { update } = useTagEdit();
  const query = useQueryClient();

  const { setValue, trigger, control, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues: toSchema(current),
    resolver: zodResolver(formSchema),
  });

  // const filteredTags = useMemo(() => {
  //   const search = tagFilters.search?.trim() || '';

  //   if (!search) return tagToShow;

  //   return tagToShow.filter((tag) => tag.name?.toLowerCase().includes(search.toLowerCase()));
  // }, [tagFilters?.search, tagToShow]);

  // const selectedTagIds = watch('tagList') || [];

  // const selectedTags = selectedTagIds
  //   .map((id) => tagList?.find((t) => t.id === id))
  //   .filter((tag) => !!tag);

  // const tagsToRemove = tagList?.filter((t) => selectedTagIds.includes(t.id)) || [];
  // const tagsToAdd = tagList?.filter((t) => !selectedTagIds.includes(t.id)) || [];

  // const openAddTags = () => {
  //   bottomSheetRef.current?.expand();
  //   setTagToShow(tagsToAdd);
  // };

  // const openRemoveTags = () => {
  //   bottomSheetRef.current?.expand();
  //   setTagToShow(tagsToRemove);
  // };

  // const toggleTag = (tag: BaseTag) => {
  //   const isSelected = selectedTagIds.includes(tag.id);

  //   if (isSelected) {
  //     setValue(
  //       'tagList',
  //       selectedTagIds.filter((id) => id !== tag.id),
  //       { shouldDirty: true }
  //     );
  //   } else {
  //     setValue('tagList', [...selectedTagIds, tag.id], { shouldDirty: true });
  //   }
  // };

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
    <GestureHandlerRootView className="flex-1 bg-green-300">
      <View>
        <Field name="name" control={control} labelId={'tag-name'} labelText={'Name'} />

        {/* <Label>Tags</Label>
        <View className="flex flex-row gap-4">
          {selectedTags.map((e) => (
            <TagTile key={e.id} tag={e} />
          ))}
        </View>

        <Button onPress={openRemoveTags}>
          <Text>Remove Tags</Text>
        </Button>

        <Button onPress={openAddTags}>
          <Text>Add Tags</Text>
        </Button> */}
      </View>

      {/* <BottomSheet index={-1} snapPoints={['90%']} ref={bottomSheetRef} enablePanDownToClose={true}>
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
                <Text className="text-muted-foreground">{`No tags found for "${tagFilters.search}"`}</Text>
              </View>
            )}
          />
        </BottomSheetView>
      </BottomSheet> */}
    </GestureHandlerRootView>
  );
}

function toSchema(obj?: Tag): FormSchema {
  return {
    name: obj?.name || '',
  };
}
