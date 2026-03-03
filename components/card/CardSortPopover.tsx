import { cardOrderByEnum, CardOrderByEnum, DirectionEnum } from '@/lib/enums';

import { Icon } from '@/components/ui/icon';
import { ArrowDownUp } from 'lucide-react-native';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectOption } from '@/components/form/SelectField';
import useConfig from '@/hooks/query/useConfig';
import { useMemo } from 'react';

interface Sort {
  orderBy: CardOrderByEnum;
  direction: DirectionEnum;
}

interface Props {
  //   conf: Conf;
  sort: Sort;
  onSortChange?: (sort: Sort) => void;
}

export default function CardSortPopover({ sort, onSortChange }: Props) {
  // const {} = useConfig()

  const options: SelectOption[] = useMemo(
    () => [
      {
        value: cardOrderByEnum.CreateionTime,
        label: 'Createion Time',
      },
      {
        value: cardOrderByEnum.KnowledgeLevel,
        label: 'Knowledge Level',
      },
      {
        value: cardOrderByEnum.SideA,
        label: 'Alphabetical A',
      },
      {
        value: cardOrderByEnum.SideB,
        label: 'Alphabetical B',
      },
    ],
    []
  );

  const swapLabel = 'Swap Direction';

  return (
    <Select
      value={
        selectedOption ? { value: selectedOption.value, label: selectedOption.label } : undefined
      }
      onValueChange={(option) => {
        onSortChange(option?.value);
      }}>
      <SelectTrigger>
        <Icon as={ArrowDownUp} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((e) => (
            <SelectItem key={e.value} label={e.label} value={e.value}>
              {e.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectItem key={'dir'} label={swapLabel} value={sort.direction}>
            {swapLabel}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
