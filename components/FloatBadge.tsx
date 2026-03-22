import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/ui/text';

interface Props {
  value: string | number;
}

export default function FloatBadge({ value }: Props) {
  return (
    <Badge
      variant={'secondary'}
      className="absolute right-0 top-0 z-10 m-4 rounded-sm border border-border p-2">
      <Typography variant={'large'}>{value}</Typography>
    </Badge>
  );
}
