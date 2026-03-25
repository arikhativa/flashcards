import { BaseTag, Card } from '@/db/schema';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import CardFlashList from '@/components/card/CardFlashList';
import { useMultiSelect } from '@/hooks/useMultiSelect';
import CardListActionBar from '@/components/card/CardListActionBar';
import ScreenSpinner from '@/components/ScreenSpinner';
import FloatBadge from '@/components/FloatBadge';
import { BottomSheetList } from '@/components/BottomSheetList';
import TagFlashList from '@/components/tag/TagFlashList';
import useTagList from '@/hooks/query/useTagList';
import { useMemo, useRef, useState } from 'react';
import { TagFilters } from '@/hooks/query/useTagListFilters';
import BottomSheet from '@gorhom/bottom-sheet';
import useTagEdit from '@/hooks/mutation/useTagEdit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyStore } from '@/lib/queryKeyStore';

interface Props {
  cardList?: Card[];
  isPending?: boolean;
}

const MAX_ITEMS_IN_SHEET = 20 as const;

export default function CardTileList({ cardList, isPending }: Props) {
  const queryClient = useQueryClient();

  const { update, create } = useTagEdit();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();

  const [tagFilters, setTagFilters] = useState<TagFilters>({});
  const { data: tagList } = useTagList(tagFilters);

  const { selectedIds, isIdSelected, isMultiSelectOn, toggleIdSelection, clearSelectedIds } =
    useMultiSelect();

  const openPickTag = () => {
    bottomSheetRef.current?.expand();
  };
  const closePickTag = () => {
    bottomSheetRef.current?.close();
  };

  const { mutate } = useMutation({
    mutationFn: async (tagId: BaseTag['id']) => {
      const targetTag = tagList?.find((e) => e.id === tagId);
      const currentCardIds = targetTag?.cardList.map((e) => e.id) || [];
      const uniqueCardIds = Array.from(new Set([...currentCardIds, ...selectedIds]));

      return update(tagId, { cardList: uniqueCardIds });
    },
    onSuccess: (_date, tagId) => {
      for (const id of selectedIds) {
        queryClient.removeQueries({ queryKey: queryKeyStore.cards.detail(id).queryKey });
      }
      queryClient.invalidateQueries({ queryKey: queryKeyStore.tag.list._def });
      queryClient.invalidateQueries({ queryKey: queryKeyStore.tag.detail(tagId).queryKey });
      clearSelectedIds();
    },
    onError: (e) => {
      console.error('mutate err: ', e);
    },
    onSettled: () => {
      closePickTag();
    },
  });

  const { mutate: mCreate } = useMutation({
    mutationFn: async () => {
      return create({ name: '' });
    },
    onSuccess: (data) => {
      console.log('data', data);
      queryClient.invalidateQueries({ queryKey: queryKeyStore.tag.list._def });
      clearSelectedIds();
      router.push({
        pathname: '/tag/[id]',
        params: { id: data, ids: selectedIds.join(',') },
      });
    },
    onError: (e) => {
      console.error('mutate err: ', e);
    },
  });

  const navToTagForm = () => {
    mCreate();
  };

  if (isPending) {
    return <ScreenSpinner />;
  }

  return (
    <Pressable
      className="flex-1"
      onPress={() => {
        if (isMultiSelectOn) clearSelectedIds();
      }}>
      {cardList?.length ? <FloatBadge value={cardList.length} /> : null}
      <CardFlashList
        list={cardList || []}
        onLongPress={(obj) => {
          toggleIdSelection(obj.id);
        }}
        getVariant={(obj) => (isIdSelected(obj.id) ? 'selected' : undefined)}
        onPress={(obj) => {
          if (isMultiSelectOn) {
            toggleIdSelection(obj.id);
          } else {
            router.navigate({
              pathname: '/card/[id]',
              params: { id: obj.id },
            });
          }
        }}
      />

      <CardListActionBar
        onCreateTag={navToTagForm}
        openPickTag={openPickTag}
        clearSelectedIds={clearSelectedIds}
        selectedIds={selectedIds}
        isMultiSelectOn={isMultiSelectOn}
      />

      <BottomSheetList
        search={tagFilters.search}
        onChangeText={(search) => setTagFilters((prev) => ({ ...prev, search }))}
        ref={bottomSheetRef}>
        <TagFlashList
          tags={tagList?.slice(0, MAX_ITEMS_IN_SHEET) || []}
          onPress={(tag) => {
            mutate(tag.id);
          }}
        />
      </BottomSheetList>
    </Pressable>
  );
}
