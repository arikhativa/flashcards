import { knowledgeLevelEnum } from '@/lib/enums';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { Funnel } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { KnowledgeLevelDialog } from '@/components/KnowledgeLevelDialog';
import { TimeRangeDialog } from '@/components/TimeRangeDialog';
import useCardListFilters from '@/hooks/query/useCardListFilters';

export default function CardFilterDropdown() {
  const { filters } = useCardListFilters();
  const [klOpen, setKLOpen] = useState<boolean | undefined>(false);
  const [timeOpen, setTimeOpen] = useState<boolean | undefined>(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };

  function isFilterOn(): boolean {
    if (filters.kl.length < Object.keys(knowledgeLevelEnum).length && filters.kl.length > 0) {
      return true;
    }
    if (filters.dateRange.dateFrom !== null && filters.dateRange.dateTo !== null) {
      return true;
    }
    return false;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon'}
          className={isFilterOn() ? 'border-2 border-primary' : ''}>
          <Icon as={Funnel} className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent insets={contentInsets} sideOffset={2} className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onPress={() => setTimeOpen(true)}>
            <Typography>By Time Interval</Typography>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => setKLOpen(true)}>
            <Typography>By Knowledge Level</Typography>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <KnowledgeLevelDialog open={klOpen} onOpenChange={setKLOpen} />
      <TimeRangeDialog open={timeOpen} onOpenChange={setTimeOpen} />
    </DropdownMenu>
  );
}
