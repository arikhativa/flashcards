import HoverIconButton from '@/components/HoverIconButton';
import HoverIconButtonList from '@/components/HoverIconButtonList';
import useTagEdit from '@/hooks/mutation/useTagEdit';
import { queryKeyStore } from '@/lib/queryKeyStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { GraduationCap, Plus, X } from 'lucide-react-native';

interface Props {
  isMultiSelectOn: boolean;
  selectedIds: number[];
  clearSelectedIds: () => void;
}

export default function TagListActionBar({
  isMultiSelectOn,
  selectedIds,
  clearSelectedIds,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { deleteMany } = useTagEdit();

  const { mutate } = useMutation({
    mutationFn: async (selectedIds: number[]) => {
      return deleteMany(selectedIds);
    },
    onSuccess: (_data, variables) => {
      for (const id of variables) {
        queryClient.removeQueries({ queryKey: queryKeyStore.tag.detail(id).queryKey });
      }
      queryClient.invalidateQueries({ queryKey: queryKeyStore.tag.list._def });
      queryClient.invalidateQueries({ queryKey: queryKeyStore.cards.detail._def });
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
            pathname: '/tag/new',
          })
        }
        icon={Plus}
      />
      <HoverIconButton
        onPress={() =>
          router.navigate({
            pathname: isMultiSelectOn ? '/test/tags/[ids]' : '/test/setup',
            params: isMultiSelectOn ? { ids: selectedIds.join(',') } : undefined,
          })
        }
        icon={GraduationCap}
      />
      <HoverIconButton disabled={!isMultiSelectOn} onPress={() => mutate(selectedIds)} icon={X} />
    </HoverIconButtonList>
  );
}
