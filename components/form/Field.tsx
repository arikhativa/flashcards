import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/text';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  labelId: string;
  labelText: string;
  className?: string;
  placeholder?: string;
}

export default function Field<T extends FieldValues>({
  name,
  control,
  className,
  labelId,
  labelText,
  placeholder = '...',
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={className}>
          <Label nativeID={labelId} htmlFor={labelId}>
            {labelText}
          </Label>
          <Input
            aria-labelledby={labelId}
            id={labelId}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
          />
          {error && (
            <Typography className="mt-1 text-sm text-destructive">{error.message}</Typography>
          )}
        </View>
      )}
    />
  );
}
