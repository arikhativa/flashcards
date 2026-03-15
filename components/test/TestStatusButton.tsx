import { Button } from '@/components/ui/button';
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
        className={showBtnColor ? 'bg-red-200' : ''}
        onPress={onPress}>
        <X />
      </Button>
    );
  }

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      disabled={disabled}
      className={showBtnColor ? 'bg-green-200' : ''}
      onPress={onPress}>
      <Check />
    </Button>
  );
}
