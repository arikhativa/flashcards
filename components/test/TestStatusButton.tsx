import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Check, X } from 'lucide-react-native';

type Props =
  | {
      disabled?: boolean;
      showBtnColor?: boolean;
      onPress?: () => void;
      type: 'x';
    }
  | {
      disabled?: boolean;
      showBtnColor?: boolean;
      onPress?: () => void;
      type: 'check';
    };

export default function TestStatusButton({ disabled, showBtnColor, type, onPress }: Props) {
  if (type === 'x') {
    return (
      <Button
        variant={'outline'}
        size={'icon'}
        disabled={disabled}
        className={showBtnColor ? 'bg-red-200 dark:bg-red-500' : ''}
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
      className={showBtnColor ? 'bg-green-200 dark:bg-green-500' : ''}
      onPress={onPress}>
      <Icon as={Check} />
    </Button>
  );
}
