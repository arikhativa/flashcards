import TagTile from '@/components/tag/TagTile';
import { BadgeProps } from '@/components/ui/badge';
import { Typography } from '@/components/ui/text';
import { BaseTag, Tag } from '@/db/schema';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';

interface Props {
  tags: (BaseTag | Tag)[];
  onPress: (t: BaseTag | Tag) => void;
  onLongPress?: (t: BaseTag | Tag) => void;
  getVariant?: (t: BaseTag | Tag) => BadgeProps['variant'];
}

export default function TagFlashList({ getVariant, onLongPress, tags, onPress }: Props) {
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
      ListEmptyComponent={() => (
        <View className="items-center p-10">
          <Typography className="text-muted-foreground">empty</Typography>
        </View>
      )}
    />
  );
}
