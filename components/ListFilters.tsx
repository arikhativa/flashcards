import SearchInput from '@/components/form/SearchInput';
import { View } from 'react-native';

interface Props {
  onSearch?: (value: string) => void;
  children?: React.ReactNode;
}

export default function ListFilters({ onSearch, children }: Props) {
  return (
    <View className="flex w-full flex-row items-center justify-center gap-2 bg-primary/20 px-2">
      <SearchInput className="my-2 h-10 flex-1" onSearch={onSearch} />
      {children}
    </View>
  );
}
