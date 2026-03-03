import SearchInput from '@/components/form/SearchInput';
import { View } from 'react-native';

interface Props {
  onSearch?: (value: string) => void;
}

export default function ListFilters({ onSearch }: Props) {
  return (
    <View className="w-full bg-primary/20 px-2">
      <SearchInput className="my-2 h-10" onSearch={onSearch} />
    </View>
  );
}
