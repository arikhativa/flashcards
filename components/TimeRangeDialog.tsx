import {
  startOfDay,
  endOfDay,
  subDays,
  subWeeks,
  subMonths,
  isWithinInterval,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInCalendarMonths,
} from 'date-fns';
import SelectEnum from '@/components/form/SelectEnum';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Typography } from '@/components/ui/text';
import useCardListFilters from '@/hooks/query/useCardListFilters';
import { fixedDateEnum, FixedDateEnum } from '@/lib/enums';
import { useState } from 'react';
import { View } from 'react-native';
import { DateRange } from '@/lib/types';

interface Props {
  open?: boolean;
  onOpenChange: (open?: boolean) => void;
}

const labelEnum: Record<FixedDateEnum, string> = {
  LastDay: 'Last Day',
  LastWeek: 'Last Week',
  LastMonth: 'Last Month',
  Anytime: 'Anytime',
};

export function TimeRangeDialog({ open, onOpenChange }: Props) {
  const { filters, setFilters } = useCardListFilters();
  const [local, setLocal] = useState(rangeToFixedDate(filters.dateRange));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-14">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg">Select Date</DialogTitle>
        </DialogHeader>
        <View className="flex gap-4">
          <SelectEnum labelEnum={labelEnum} value={local} onChange={setLocal} />
        </View>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              onPress={() => {
                onOpenChange(false);
              }}>
              <Typography>Cancel</Typography>
            </Button>
          </DialogClose>
          <Button
            onPress={() => {
              setFilters({ ...filters, dateRange: fixedDateToRange(local) });
              onOpenChange(false);
            }}>
            <Typography>Save</Typography>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function fixedDateToRange(e: FixedDateEnum): DateRange {
  const now = new Date();

  switch (e) {
    case fixedDateEnum.LastDay:
      return { dateFrom: startOfDay(subDays(now, 1)), dateTo: endOfDay(now) };
    case fixedDateEnum.LastWeek:
      return { dateFrom: startOfDay(subWeeks(now, 1)), dateTo: endOfDay(now) };
    case fixedDateEnum.LastMonth:
      return { dateFrom: startOfDay(subMonths(now, 1)), dateTo: endOfDay(now) };
    case fixedDateEnum.Anytime:
    default:
      return { dateFrom: null, dateTo: null };
  }
}

export function rangeToFixedDate(range: DateRange): FixedDateEnum {
  const { dateFrom, dateTo } = range;

  if (!dateFrom || !dateTo) {
    return fixedDateEnum.Anytime;
  }

  const now = new Date();

  const daysDiff = differenceInCalendarDays(dateTo, dateFrom);
  const weeksDiff = differenceInCalendarWeeks(dateTo, dateFrom);
  const monthsDiff = differenceInCalendarMonths(dateTo, dateFrom);

  const toIsNow = isWithinInterval(now, {
    start: startOfDay(dateTo),
    end: endOfDay(dateTo),
  });

  if (!toIsNow) {
    return fixedDateEnum.Anytime;
  }

  if (daysDiff <= 1) return fixedDateEnum.LastDay;
  if (weeksDiff <= 1) return fixedDateEnum.LastWeek;
  if (monthsDiff <= 1) return fixedDateEnum.LastMonth;

  return fixedDateEnum.Anytime;
}
