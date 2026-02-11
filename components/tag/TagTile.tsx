import { Tag } from '@/db/schema';
import { Text } from '@/components/ui/text';
import { Pressable } from 'react-native';
import { cn } from '@/lib/utils';

interface Props {
  tag: Tag;
  onPress?: (t: Tag) => void;
  className?: string;
}

export default function TagTile({ tag, className, onPress }: Props) {
  return (
    <Pressable
      className={cn('flex items-center rounded-md border border-secondary p-1', className)}
      onPress={() => onPress?.(tag)}>
      <Text disabled>{tag.name}</Text>
    </Pressable>
  );
}
