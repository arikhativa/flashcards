import { KnowledgeLevelEnum } from '@/lib/enums';
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
import { KnolageLevelDialog } from '@/components/KnolageLevelDialog';
import { TimeRangeDialog } from '@/components/TimeRangeDialog';

interface Props {
  kl: KnowledgeLevelEnum[];
  onKLChange: (kl: KnowledgeLevelEnum[]) => void;
}

export default function CardFilterDropdown({ kl, onKLChange }: Props) {
  const [klOpen, setKLOpen] = useState<boolean | undefined>(false);
  const [timeOpen, setTimeOpen] = useState<boolean | undefined>(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
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
      <KnolageLevelDialog kl={kl} onKLChange={onKLChange} open={klOpen} onOpenChange={setKLOpen} />
      <TimeRangeDialog open={timeOpen} onOpenChange={setTimeOpen} />
    </DropdownMenu>
  );
}
