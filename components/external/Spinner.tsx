import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react-native';

function Spinner({ className }: { className?: string }) {
  return <Icon as={Loader2Icon} className={cn('size-4 animate-spin', className)} />;
}

export { Spinner };
