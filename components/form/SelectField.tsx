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

type Option = {
  value: string;
  label: string;
};

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  labelId: string;
  options: Option[];
  labelText: string;
  className?: string;
  placeholder?: string;
}

export default function SelectField<T extends FieldValues>({
  name,
  control,
  className,
  options,
  labelId,
  labelText,
  placeholder = '...',
}: Props<T>) {
  const ref = useRef<TriggerRef>(null);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  // for no we dont need this but the doc saied we would:
  // Workaround for rn-primitives/select not opening on mobile
  function onTouchStart() {
    // ref.current?.open();
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOption = options.find((x) => x.value === value);
        return (
          <View className={className}>
            <Label nativeID={labelId} htmlFor={labelId}>
              {labelText}
            </Label>
            <Select
              id={labelId}
              aria-labelledby={labelId}
              value={
                selectedOption
                  ? { value: selectedOption.value, label: selectedOption.label }
                  : undefined
              }
              onValueChange={(option) => {
                onChange(option?.value);
              }}>
              <SelectTrigger ref={ref} className="w-[180px]" onTouchStart={onTouchStart}>
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

            {error && (
              <Typography className="mt-1 text-sm text-destructive">{error.message}</Typography>
            )}
          </View>
        );
      }}
    />
  );
}
