import { Button, ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react-native';

type Props = ButtonProps & {
  icon: LucideIcon;
  isDestructive?: boolean;
};

export default function HoverIconButton({ icon, isDestructive, ...props }: Props) {
  return (
    <Button
      {...props}
      variant={'outline'}
      className={cn(
        'aspect-square w-12 border-primary shadow-md shadow-primary',
        isDestructive && 'border-destructive text-destructive'
      )}>
      <Icon as={icon} className={cn('size-6', isDestructive && 'text-destructive')} />
    </Button>
  );
}
