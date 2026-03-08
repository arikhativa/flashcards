import HoverIconButton from '@/components/HoverIconButton';
import HoverIconButtonList from '@/components/HoverIconButtonList';
import { useRouter } from 'expo-router';
import { GraduationCap, Plus, X } from 'lucide-react-native';

interface Props {
  isMultiSelectOn: boolean;
  selectedIds: number[];
}

export default function CardListActionBar({ isMultiSelectOn, selectedIds }: Props) {
  const router = useRouter();

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
        onPress={() =>
          router.navigate({
            pathname: isMultiSelectOn ? '/test/cards/[ids]' : '/test/setup',
            params: isMultiSelectOn ? { ids: selectedIds.join(',') } : undefined,
          })
        }
        icon={GraduationCap}
      />
      <HoverIconButton
        disabled={!isMultiSelectOn}
        onPress={() =>
          router.navigate({
            pathname: '/card/new',
          })
        }
        icon={X}
      />
    </HoverIconButtonList>
  );
}
