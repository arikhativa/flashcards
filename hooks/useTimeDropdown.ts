import { TimeRange } from "@/types/generic";
import { OPTIONS_VALUES } from "@/utils/testForm";
import { useState } from "react";

export interface TimeDropdown {
  timeSelected: OPTIONS_VALUES | undefined;
  setTimeSelectedWrapper: (value?: string) => void;
  isTimeSelectedValid: () => boolean;
  range: TimeRange;
  setRange: React.Dispatch<React.SetStateAction<TimeRange>>;
}

export function useTimeDropdown(init?: OPTIONS_VALUES): TimeDropdown {
  const [timeSelected, setTimeSelected] = useState<OPTIONS_VALUES | undefined>(
    init
  );

  const [range, setRange] = useState<TimeRange>({});

  const isTimeSelectedValid = (): boolean => {
    return timeSelected !== undefined;
  };

  const setTimeSelectedWrapper = (value?: string) => {
    setTimeSelected(value as OPTIONS_VALUES);
    if (!value || value === OPTIONS_VALUES.Anytime) {
      setRange({});
      return;
    }

    let past = new Date();
    if (value === OPTIONS_VALUES.Day) {
      past.setHours(past.getHours() - 24);
    }
    if (value === OPTIONS_VALUES.Week) {
      past.setHours(past.getHours() - 24 * 7);
    }
    if (value === OPTIONS_VALUES.Month) {
      past.setHours(past.getHours() - 24 * 30);
    }
    setRange({
      startDate: past,
      endDate: new Date(),
    });
  };

  return {
    timeSelected,
    setTimeSelectedWrapper,
    isTimeSelectedValid,
    range,
    setRange,
  };
}
