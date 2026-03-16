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
import { fixedDateEnum, FixedDateEnum } from '@/lib/enums';
import { useEffect, useState } from 'react';
import { DateRange } from '@/lib/types';

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const fixedDateEnumText: Record<FixedDateEnum, string> = {
  LastDay: 'Last Day',
  LastWeek: 'Last Week',
  LastMonth: 'Last Month',
  Anytime: 'Anytime',
} as const;

export function TimeRangeSelect({ value, onChange }: Props) {
  const [local, setLocal] = useState(rangeToFixedDate(value));

  useEffect(() => {
    onChange(fixedDateToRange(local));
  }, [local]);

  return <SelectEnum labelEnum={fixedDateEnumText} value={local} onChange={setLocal} />;
}

function fixedDateToRange(e: FixedDateEnum): DateRange {
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

function rangeToFixedDate(range: DateRange): FixedDateEnum {
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
