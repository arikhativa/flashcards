import { BaseTag, Tag } from '@/db/schema';
import { Typography } from '@/components/ui/text';
import { Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { isTag } from '@/lib/typeGuards';
import { Separator } from '@/components/ui/separator';
import { GestureWrapper } from '@/components/GestureWrapper';

type Props = {
  tag: BaseTag | Tag;
  onPress?: (t: BaseTag) => void;
  onLongPress?: (c: BaseTag | Tag) => void;
  className?: string;
  iconClassName?: string;
  variant?: BadgeProps['variant'];
  icon?: LucideIcon;
  showCount?: boolean;
};

export default function TagTile(props: Props) {
  const { className, onPress, variant, iconClassName, tag, icon, showCount } = props;
  return (
    <GestureWrapper onPress={() => onPress?.(tag)} onLongPress={() => props.onLongPress?.(tag)}>
      <Badge
        variant={variant}
        pointerEvents="none"
        className={cn('flex gap-2 px-3 py-1', className)}>
        <Typography pointerEvents="none" selectable={false}>
          {tag.name}
        </Typography>
        {icon && <Icon className={iconClassName} as={icon} />}
        {showCount && isTag(tag) && (
          <>
            <Separator orientation="vertical" />
            <Typography>{tag.cardList.length}</Typography>
          </>
        )}
      </Badge>
    </GestureWrapper>
  );
}
