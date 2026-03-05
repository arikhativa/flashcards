import { Card } from '@/db/schema';
import CardTile from '@/components/card/CardTile';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { GraduationCap, Plus } from 'lucide-react-native';
import HoverIconButton from '@/components/HoverIconButton';
import { Typography } from '@/components/ui/text';
import { Spinner } from '@/components/external/Spinner';
import CardFlashList from '@/components/card/CardFlashList';

interface Props {
  cardList?: Card[];
  isPending?: boolean;
}

export default function CardTileList({ cardList, isPending }: Props) {
  const router = useRouter();

  const getScreen = () => {
    if (isPending) {
      return (
        <View className="flex flex-1 items-center justify-center">
          <Spinner />
        </View>
      );
    }

    if (!cardList || !cardList.length) {
      return (
        <View className="flex flex-1 items-center justify-center">
          <Typography variant={'muted'}>...</Typography>
        </View>
      );
    }

    return (
      <CardFlashList
        list={cardList}
        onPress={(card) =>
          router.navigate({
            pathname: '/card/[id]',
            params: { id: card.id },
          })
        }
      />
    );
  };

  return (
    <View className="flex-1">
      {getScreen()}
      <View className="absolute bottom-0 left-0 right-0 flex flex-row-reverse gap-4 p-4">
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
      </View>
    </View>
  );
}
