import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react-native';

type Props =
  | {
      disabled?: boolean;
      showBtnColor?: boolean;
      className?: string;
      onPress?: () => void;
      type: 'x';
    }
  | {
      className?: string;
      disabled?: boolean;
      showBtnColor?: boolean;
      onPress?: () => void;
      type: 'check';
    };

export default function TestStatusButton({
  disabled,
  className,
  showBtnColor,
  type,
  onPress,
}: Props) {
  if (type === 'x') {
    return (
      <Button
        variant={'outline'}
        size={'icon'}
        disabled={disabled}
        className={cn(showBtnColor ? 'bg-red-200 dark:bg-red-500' : '', className)}
        onPress={onPress}>
        <Icon as={X} />
      </Button>
    );
  }

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      disabled={disabled}
      className={cn(showBtnColor ? 'bg-green-200 dark:bg-green-500' : '', className)}
      onPress={onPress}>
      <Icon as={Check} />
    </Button>
  );
}
