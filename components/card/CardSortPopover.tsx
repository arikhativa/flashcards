import { CardOrderByEnum, DirectionEnum } from '@/lib/enums';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { ArrowDown, ArrowDownUp, ArrowUp } from 'lucide-react-native';
import useSuspenseConfig from '@/hooks/query/useConfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

interface Props {
  orderBy: CardOrderByEnum;
  direction: DirectionEnum;
  onDirectionChange?: (dir: DirectionEnum) => void;
  onOrderByChange?: (orderBy: CardOrderByEnum) => void;
}

export default function CardSortPopover({
  orderBy,
  direction,
  onDirectionChange,
  onOrderByChange,
}: Props) {
  const { data } = useSuspenseConfig();

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };

  function Item({ value, label }: { label: string; value: CardOrderByEnum }) {
    return (
      <DropdownMenuItem onPress={() => onOrderByChange?.(value)}>
        <Typography className={orderBy === value ? 'font-extrabold' : ''}>{label}</Typography>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Icon as={ArrowDownUp} className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent insets={contentInsets} sideOffset={2} className="w-56" align="start">
        <DropdownMenuGroup>
          <Item value="CreationTime" label="Creation Time" />
          <Item value="KnowledgeLevel" label="Knowledge Level" />
          <Item value="SideA" label={'Alphabetical ' + data?.sideA} />
          <Item value="SideB" label={'Alphabetical ' + data?.sideB} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onPress={() => onDirectionChange?.(direction === 'Desc' ? 'Asc' : 'Desc')}>
            <Typography>Swap Direction</Typography>
            <Icon as={direction === 'Asc' ? ArrowDown : ArrowUp} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
