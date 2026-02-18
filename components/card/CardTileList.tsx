import { Card } from '@/db/schema';
import CardTile from '@/components/card/CardTile';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus } from 'lucide-react-native';

interface Props {
  cardList: Card[];
}

export default function CardTileList({ cardList }: Props) {
  const router = useRouter();

  return (
    <View className="flex-1">
      <FlashList
        horizontal={false}
        numColumns={3}
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
      <View className="absolute bottom-0 left-0 right-0 flex flex-row-reverse p-4">
        <Button
          onPress={() =>
            router.navigate({
              pathname: '/card/new',
            })
          }
          variant={'outline'}
          size={'icon'}>
          <Plus />
        </Button>
        <Button
          onPress={() =>
            router.navigate({
              pathname: '/test',
            })
          }
          variant={'outline'}
          size={'icon'}>
          <GraduationCap />
        </Button>
      </View>
    </View>
  );
}
