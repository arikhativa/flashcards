import { Typography } from '@/components/ui/text';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

export function GlobalHeader({
  title,
  titleClassName,
  node,
}: {
  title?: string;
  titleClassName?: string;
  node?: React.ReactNode;
}) {
  return (
    <View className="flex flex-col px-3 pt-1">
      <View>
        <Typography className={cn('text-xl font-bold', titleClassName)}>{title}</Typography>
      </View>

      {node && <View>{node}</View>}
    </View>
  );
}
