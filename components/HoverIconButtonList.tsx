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
      className={cn(
        'absolute bottom-0 left-0 right-0 flex flex-row-reverse gap-10 pb-20 pr-10',
        className
      )}>
      {children}
    </View>
  );
}
