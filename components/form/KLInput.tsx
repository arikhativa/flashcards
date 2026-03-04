import { Button } from '@/components/ui/button';
import { CardContent, CardRoot } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/text';
import { knowledgeLevelColorEnum, KnowledgeLevelEnum, knowledgeLevelText } from '@/lib/enums';
import { cn } from '@/lib/utils';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  labelId?: string;
  labelText?: string;
}

export default function KLInput<T extends FieldValues>({
  name,
  control,
  labelId,
  labelText,
}: Props<T>) {
  function KLButton({
    onChange,
    current,
    kl,
  }: {
    onChange: (...event: any[]) => void;
    current: KnowledgeLevelEnum;
    kl: KnowledgeLevelEnum;
  }) {
    return (
      <Button
        variant={'outline'}
        onPress={() => onChange(kl)}
        className={cn(
          'rounded-none border-4 bg-transparent',
          knowledgeLevelColorEnum[kl].border,
          current !== kl ? 'border border-dashed' : 'border'
        )}>
        <Typography>{knowledgeLevelText[kl]}</Typography>
      </Button>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="flex flex-col gap-2">
          {labelText && (
            <Label nativeID={labelId} htmlFor={labelId}>
              {labelText}
            </Label>
          )}
          <View className="flex flex-col gap-3">
            <KLButton onChange={onChange} current={value} kl={'Learning'} />
            <KLButton onChange={onChange} current={value} kl={'GettingThere'} />
            <KLButton onChange={onChange} current={value} kl={'Confident'} />
          </View>
        </View>
      )}
    />
  );
}
