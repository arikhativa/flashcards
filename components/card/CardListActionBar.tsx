import HoverIconButton from '@/components/HoverIconButton';
import HoverIconButtonList from '@/components/HoverIconButtonList';
import { useRouter } from 'expo-router';
import { GraduationCap, Plus } from 'lucide-react-native';

export default function CardListActionBar() {
  const router = useRouter();

  return (
    <HoverIconButtonList className="p-4">
      <HoverIconButton
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
            pathname: '/test/setup',
          })
        }
        icon={GraduationCap}
      />
    </HoverIconButtonList>
  );
}
