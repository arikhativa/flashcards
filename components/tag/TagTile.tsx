import { BaseTag } from '@/db/schema';
import { Typography } from '@/components/ui/text';
import { Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';

interface Props {
  tag: BaseTag;
  onPress?: (t: BaseTag) => void;
  className?: string;
  iconClassName?: string;
  variant?: BadgeProps['variant'];
  icon?: LucideIcon;
}

export default function TagTile({ tag, className, onPress, variant, icon, iconClassName }: Props) {
  return (
    <Pressable onPress={() => onPress?.(tag)}>
      <Badge
        variant={variant}
        pointerEvents="none"
        className={cn('flex gap-2 px-3 py-1', className)}>
        <Typography pointerEvents="none" selectable={false}>
          {tag.name}
        </Typography>
        {icon && <Icon className={iconClassName} as={icon} />}
      </Badge>
    </Pressable>
  );
}
