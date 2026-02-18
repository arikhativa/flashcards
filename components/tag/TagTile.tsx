import { BaseTag } from '@/db/schema';
import { Typography } from '@/components/ui/text';
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
      <Typography selectable={false}>{tag.name}</Typography>
    </Pressable>
  );
}
