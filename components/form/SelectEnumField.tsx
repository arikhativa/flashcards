import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/text';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';
import { cn } from '@/lib/utils';
import SelectEnum from '@/components/form/SelectEnum';

interface Props<T extends FieldValues, TEnum extends string> {
  name: Path<T>;
  control: Control<T>;
  labelId: string;
  labelText: string;
  labelEnum: Record<TEnum, string>;
  className?: string;
  placeholder?: string;
}

export default function SelectEnumField<T extends FieldValues, TEnum extends string>({
  name,
  control,
  labelId,
  labelText,
  labelEnum,
  className,
  placeholder,
}: Props<T, TEnum>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className={cn('flex flex-col gap-2', className)}>
          <Label nativeID={labelId} htmlFor={labelId}>
            {labelText}
          </Label>
          <SelectEnum
            labelEnum={labelEnum}
            value={value as TEnum}
            onChange={onChange}
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
