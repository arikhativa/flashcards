import HoverIconButton from '@/components/HoverIconButton';
import HoverIconButtonList from '@/components/HoverIconButtonList';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { GraduationCap, Plus, Trash2, X } from 'lucide-react-native';

interface Props {
  isMultiSelectOn: boolean;
  selectedIds: number[];
  clearSelectedIds: () => void;
}

export default function CardListActionBar({
  isMultiSelectOn,
  selectedIds,
  clearSelectedIds,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { deleteMany } = useCardEdit();

  const { mutate } = useMutation({
    mutationFn: async (selectedIds: number[]) => {
      return deleteMany(selectedIds);
    },
    onSuccess: (_data, variables) => {
      for (const id of variables) {
        queryClient.removeQueries({ queryKey: queryKeyStore.cards.detail(id).queryKey });
      }
      queryClient.invalidateQueries({ queryKey: queryKeyStore.cards.list._def });
      queryClient.invalidateQueries({ queryKey: queryKeyStore.tag.detail._def });
      clearSelectedIds();
    },
    onError: (e) => {
      console.error('mutate err: ', e);
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
        badgeValue={isMultiSelectOn ? selectedIds.length : undefined}
        onPress={() =>
          router.navigate({
            pathname: isMultiSelectOn ? '/test/setup/cards/[ids]' : '/test/setup',
            params: isMultiSelectOn ? { ids: selectedIds.join(',') } : undefined,
          })
        }
        icon={GraduationCap}
      />

      <HoverIconButton
        variant={'outline'}
        disabled={!isMultiSelectOn}
        onPress={clearSelectedIds}
        icon={X}
      />

      {/* Note: This is a placeholder */}
      <HoverIconButton disabled icon={X} />
      <HoverIconButton disabled icon={X} />

      <HoverIconButton
        disabled={!isMultiSelectOn}
        variant={'destructive'}
        onPress={() => mutate(selectedIds)}
        icon={Trash2}
      />
    </HoverIconButtonList>
  );
}
