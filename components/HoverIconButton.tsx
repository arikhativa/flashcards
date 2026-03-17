import { Badge } from '@/components/ui/badge';
import { Button, ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react-native';

type Props = ButtonProps & {
  icon: LucideIcon;
  badgeValue?: string | number;
  isDestructive?: boolean;
  className?: string;
};

export default function HoverIconButton({
  badgeValue,
  icon,
  isDestructive,
  className,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      variant={'outline'}
      className={cn(
        'aspect-square w-12 opacity-100 shadow-md transition-opacity duration-200',
        isDestructive ? 'border-destructive shadow-destructive' : 'border-primary shadow-primary',
        props.disabled && 'opacity-0',
        className
      )}>
      <Badge
        className={cn(
          'absolute right-0 top-0 z-10 -m-3 opacity-0 transition-opacity duration-200',
          badgeValue && 'opacity-100'
        )}>
        <Typography>{badgeValue}</Typography>
      </Badge>
      <Icon as={icon} className={cn('size-6', isDestructive ? 'text-destructive' : '')} />
    </Button>
  );
}
