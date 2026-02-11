import { Card } from '@/db/schema';
import CardTile from '@/components/card/CardTile';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

interface Props {
  cardList: Card[];
}

export default function CardTileList({ cardList }: Props) {
  const router = useRouter();

  return (
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
  );
}
