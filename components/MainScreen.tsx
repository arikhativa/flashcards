import { cn } from '@/lib/utils';
import { View } from 'react-native';

export default function MainScreen({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <View className={cn('flex-1 px-3 pt-4', className)}>{children}</View>;
}
