import { EmptyItem } from '@/components/EmptyItem';
import TagTile from '@/components/tag/TagTile';
import { BadgeProps } from '@/components/ui/badge';
import { BaseTag, Tag } from '@/db/schema';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

interface Props {
  showEmptyState?: boolean;
  tags: (BaseTag | Tag)[];
  onPress: (t: BaseTag | Tag) => void;
  onLongPress?: (t: BaseTag | Tag) => void;
  getVariant?: (t: BaseTag | Tag) => BadgeProps['variant'];
}

export default function TagFlashList({
  showEmptyState,
  getVariant,
  onLongPress,
  tags,
  onPress,
}: Props) {
  const router = useRouter();

  return (
    <FlashList
      data={tags}
      horizontal={false}
      numColumns={1}
      className="px-4"
      renderItem={({ item }) => {
        return (
          <View className="flex items-start justify-center pt-4">
            <TagTile
              onPress={() => onPress(item)}
              onLongPress={() => onLongPress?.(item)}
              variant={getVariant?.(item)}
              tag={item}
              showCount
            />
          </View>
        );
      }}
      ListFooterComponent={() => <View className="h-24" />}
      contentContainerStyle={tags.length === 0 ? { flex: 1 } : {}}
      ListEmptyComponent={
        showEmptyState
          ? () => (
              <EmptyItem
                title="No Tags"
                desc="You haven't created any tags yet."
                onPress={() =>
                  router.navigate({
                    pathname: '/tag/new',
                  })
                }
                buttonText="Create tag"
              />
            )
          : null
      }
    />
  );
}
