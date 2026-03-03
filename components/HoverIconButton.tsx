import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { LucideIcon } from 'lucide-react-native';

interface Props {
  icon: LucideIcon;
  onPress: () => void;
}

export default function HoverIconButton({ icon, onPress }: Props) {
  return (
    <Button onPress={onPress} className="aspect-square w-12">
      <Icon as={icon} className="size-6" />
    </Button>
  );
}
