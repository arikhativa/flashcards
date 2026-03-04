import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/text';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Platform, View } from 'react-native';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef } from 'react';
import type { TriggerRef } from '@rn-primitives/select';
import { SelectOption } from '@/components/form/SelectField';
import { cn } from '@/lib/utils';

interface Props<T extends string> {
  labelEnum: Record<T, string>;
  value: T;
  className?: string;
  placeholder?: string;
  onChange: (v: T) => void;
}

export default function SelectEnum<T extends string>({
  labelEnum,
  value,
  className,
  onChange,
  placeholder = '',
}: Props<T>) {
  const ref = useRef<TriggerRef>(null);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  const options: SelectOption[] = Object.entries(labelEnum).map(([key, label]) => ({
    value: key as T,
    label: label as string,
  }));
  const selectedOption = options.find((x) => x.value === value);

  return (
    <Select
      value={
        selectedOption ? { value: selectedOption.value, label: selectedOption.label } : undefined
      }
      onValueChange={(option) => {
        onChange(option?.value as T);
      }}>
      <SelectTrigger ref={ref} className={cn('w-[180px]', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent insets={contentInsets} className="w-[180px]">
        <SelectGroup>
          {options.map((e) => (
            <SelectItem key={e.value} label={e.label} value={e.value}>
              {e.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
