import { CreateAddTagDialog } from '@/components/card/CreateAddTagDialog';
import { DeleteDialog } from '@/components/DeleteDialog';
import HoverIconButton from '@/components/HoverIconButton';
import HoverIconButtonList from '@/components/HoverIconButtonList';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { GraduationCap, Plus, Tag, Trash2, X } from 'lucide-react-native';
import { useState } from 'react';

interface Props {
  isMultiSelectOn: boolean;
  selectedIds: number[];
  clearSelectedIds: () => void;
  openPickTag: () => void;
  onCreateTag: () => void;
}

export default function CardListActionBar({
  isMultiSelectOn,
  selectedIds,
  openPickTag,
  onCreateTag,
  clearSelectedIds,
}: Props) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { deleteMany } = useCardEdit();

  const { mutate, isPending } = useMutation({
    mutationFn: async (selectedIds: number[]) => {
      return deleteMany(selectedIds);
    },
    onSuccess: (_data, variables) => {
      for (const id of variables) {
        queryClient.removeQueries({ queryKey: queryKeyStore.cards.detail(id).queryKey });
      }
      queryClient.invalidateQueries({ queryKey: queryKeyStore.cards.list._def });
      queryClient.invalidateQueries({ queryKey: queryKeyStore.tag.list._def });
      queryClient.invalidateQueries({ queryKey: queryKeyStore.tag.detail._def });
      clearSelectedIds();
    },
    onError: (e) => {
      console.error('mutate err: ', e);
    },
    onSettled: () => {
      setIsDeleteDialogOpen(false);
    },
  });

  return (
    <HoverIconButtonList className="p-4">
      <HoverIconButton
        disabled={isMultiSelectOn}
        onPress={() =>
          router.navigate({
            pathname: '/card/new',
          })
        }
        icon={Plus}
      />
      <HoverIconButton
        variant={'outline'}
        badgeValue={isMultiSelectOn ? selectedIds.length : undefined}
        onPress={() =>
          router.navigate({
            pathname: isMultiSelectOn ? '/test/setup/cards/[ids]' : '/test/setup',
            params: isMultiSelectOn ? { ids: selectedIds.join(',') } : undefined,
          })
        }
        icon={GraduationCap}
      />

      <CreateAddTagDialog
        open={isTagDialogOpen}
        onOpenChange={setIsTagDialogOpen}
        onAddTag={openPickTag}
        onCreateTag={onCreateTag}>
        <HoverIconButton variant={'outline'} disabled={!isMultiSelectOn} icon={Tag} />
      </CreateAddTagDialog>

      <HoverIconButton
        variant={'outline'}
        disabled={!isMultiSelectOn}
        onPress={clearSelectedIds}
        icon={X}
      />

      {/* Note: This is a placeholder */}
      <HoverIconButton disabled icon={X} />
      <HoverIconButton disabled icon={X} />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isPending={isPending}
        onConfirm={() => mutate(selectedIds)}
        title="Delete Cards"
        description={`Are you sure you want to delete ${selectedIds.length} selected ${
          selectedIds.length === 1 ? 'card' : 'cards'
        }? This action cannot be undone.`}>
        <HoverIconButton disabled={!isMultiSelectOn} variant={'destructive'} icon={Trash2} />
      </DeleteDialog>
    </HoverIconButtonList>
  );
}
