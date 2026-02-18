import { Tag } from '@/db/schema';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import TagTile from '@/components/tag/TagTile';

interface Props {
  list: Tag[];
}

export default function TagTileList({ list }: Props) {
  const router = useRouter();

  return (
    <FlashList
      horizontal={false}
      numColumns={3}
      className="p-2"
      renderItem={({ item }) => {
        return (
          <View className="m-0 flex w-full items-center justify-center p-2">
            <TagTile
              onPress={(item) =>
                router.navigate({
                  pathname: '/tag/[id]',
                  params: { id: item.id },
                })
              }
              className={'w-full'}
              tag={item}
            />
          </View>
        );
      }}
      data={list}
    />
  );
}
