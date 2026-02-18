import { BaseTag } from '@/db/schema';
import { Text } from '@/components/ui/text';
import { Pressable } from 'react-native';
import { cn } from '@/lib/utils';

interface Props {
  tag: BaseTag;
  onPress?: (t: BaseTag) => void;
  className?: string;
}

export default function TagTile({ tag, className, onPress }: Props) {
  return (
    <Pressable
      className={cn('flex items-center rounded-md border border-secondary p-1', className)}
      onPress={() => onPress?.(tag)}>
      <Text selectable={false}>{tag.name}</Text>
    </Pressable>
  );
}
