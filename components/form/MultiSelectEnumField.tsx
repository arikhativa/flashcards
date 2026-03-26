import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/text';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';
import { cn, textEnumToSelectOption } from '@/lib/utils';
import { MultiSelect } from '@/components/external/MultiSelect';

interface Props<T extends FieldValues, TEnum extends string> {
  name: Path<T>;
  control: Control<T>;
  labelId: string;
  labelText: string;
  labelEnum: Record<TEnum, string>;
  className?: string;
  placeholder?: string;
}

export default function MultiSelectEnumField<T extends FieldValues, TEnum extends string>({
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
        <View className={cn('flex flex-col gap-2')}>
          <Label nativeID={labelId} htmlFor={labelId}>
            {labelText}
          </Label>

          <MultiSelect
            className={className}
            options={textEnumToSelectOption(labelEnum)}
            value={value}
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
