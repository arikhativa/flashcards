import { Card } from '@/db/schema';
import CardTile from '@/components/card/CardTile';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { GraduationCap, Plus } from 'lucide-react-native';
import HoverIconButton from '@/components/HoverIconButton';

interface Props {
  cardList: Card[];
}

export default function CardTileList({ cardList }: Props) {
  const router = useRouter();

  return (
    <View className="flex-1">
      <FlashList
        horizontal={false}
        numColumns={1}
        className="p-2"
        renderItem={({ item }) => {
          return (
            <View className="m-0 flex w-full items-center justify-center p-2">
              <CardTile
                onPress={(card) =>
                  router.navigate({
                    pathname: '/card/[id]',
                    params: { id: card.id },
                  })
                }
                className={'w-full'}
                card={item}
              />
            </View>
          );
        }}
        data={cardList}
      />
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
