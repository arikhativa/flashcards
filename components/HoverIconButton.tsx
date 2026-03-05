import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { LucideIcon } from 'lucide-react-native';

interface Props {
  icon: LucideIcon;
  onPress: () => void;
  disabled?: boolean | null | undefined;
}

export default function HoverIconButton({ icon, disabled, onPress }: Props) {
  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      variant={'outline'}
      className="aspect-square w-12 border-primary shadow-md shadow-primary">
      <Icon as={icon} className="size-6" />
    </Button>
  );
}
