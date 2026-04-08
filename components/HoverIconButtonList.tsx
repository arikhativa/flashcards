import { cn } from '@/lib/utils';
import { View } from 'react-native';

export default function HoverIconButtonList({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <View
      pointerEvents="box-none"
      className={cn(
        'absolute bottom-24 right-0 flex flex-col-reverse justify-between gap-6',
        className
      )}>
      {children}
    </View>
  );
}
