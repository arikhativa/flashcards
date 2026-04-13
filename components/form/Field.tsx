import { NumberInput } from '@/components/form/NumberInput';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInput, View } from 'react-native';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  labelId?: string;
  labelText?: string;
  className?: string;
  inputClassName?: string;
  isTextArea?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export default function Field<T extends FieldValues>({
  name,
  isTextArea,
  control,
  className,
  inputClassName,
  labelId,
  labelText,
  placeholder = '...',
  autoFocus = false,
}: Props<T>) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={cn('flex flex-col gap-2', className)}>
          {labelText && (
            <Label nativeID={labelId} htmlFor={labelId}>
              {labelText}
            </Label>
          )}

          {typeof value === 'number' ? (
            <NumberInput
              aria-labelledby={labelId}
              id={labelId}
              className={inputClassName}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
            />
          ) : isTextArea ? (
            <Textarea
              aria-labelledby={labelId}
              id={labelId}
              className={inputClassName}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
            />
          ) : (
            <Input
              ref={inputRef}
              autoFocus={autoFocus}
              aria-labelledby={labelId}
              id={labelId}
              className={inputClassName}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
            />
          )}

          {error && (
            <Typography className="mt-1 text-sm text-destructive">{error.message}</Typography>
          )}
        </View>
      )}
    />
  );
}
