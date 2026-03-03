import { CardContent, CardRoot } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <CardRoot>
      <CardContent className={'flex flex-col gap-2'}>
        <Skeleton className="h-12 w-12 rounded-full" />
        <Separator className="bg-gray-500" orientation="horizontal" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </CardContent>
    </CardRoot>
  );
}
