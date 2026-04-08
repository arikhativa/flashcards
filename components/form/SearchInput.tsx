import { useState, useRef, useMemo } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn, debounce } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { DEBOUNCE_SEARCH_DELAY } from '@/lib/constants';

interface SearchInputProps extends TextInputProps {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  debounceTime?: number;
  className?: string;
}

export default function SearchInput({
  onSearch,
  onClear,
  debounceTime = DEBOUNCE_SEARCH_DELAY,
  className,
  placeholder = 'Search...',
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const debounced = useMemo(
    () => debounce<string>((val) => onSearch?.(val), debounceTime),
    [onSearch, debounceTime]
  );

  const handleChange = (text: string) => {
    setValue(text);
    debounced(text);
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <View
      className={cn('flex flex-row items-center gap-3 rounded-2xl bg-input px-4 py-3', className)}>
      <Icon as={Search} />

      <Input
        className="m-0 flex-1 border-0 bg-transparent p-0"
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        returnKeyType="search"
        clearButtonMode="never"
        {...props}
      />

      {value && value.length && (
        <Button size={'icon'} className="h-6 w-6" variant={'ghost'} onPress={handleClear}>
          <Icon as={X} />
        </Button>
      )}
    </View>
  );
}
