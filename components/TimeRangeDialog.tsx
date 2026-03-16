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
import { useState } from 'react';
import { View } from 'react-native';
import { TimeRangeSelect } from '@/components/form/TimeRangeSelect';

interface Props {
  open?: boolean;
  onOpenChange: (open?: boolean) => void;
}

export function TimeRangeDialog({ open, onOpenChange }: Props) {
  const { filters, setFilters } = useCardListFilters();
  const [local, setLocal] = useState(filters.dateRange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-14">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg">Select Date</DialogTitle>
        </DialogHeader>
        <View className="flex gap-4">
          <TimeRangeSelect value={filters.dateRange} onChange={setLocal} />
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
              setFilters({ ...filters, dateRange: local });
              onOpenChange(false);
            }}>
            <Typography>Save</Typography>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
