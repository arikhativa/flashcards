import * as React from 'react';
import * as SelectPrimitive from '@rn-primitives/select';
import { View, Platform, StyleSheet } from 'react-native';
import { Check, ChevronDown } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Checkbox } from '@/components/ui/checkbox';

export type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  value: string[];
  onChange: (val: string[]) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function MultiSelect({
  options,
  value,
  className,
  disabled,
  onChange,
  placeholder = 'Select...',
}: MultiSelectProps) {
  function toggle(val: string) {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  }

  function renderValue() {
    const labels = options.filter((o) => value.includes(o.value)).map((o) => o.label);

    const text = labels.join(', ');

    return text;
  }

  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger
        className={cn(
          'flex h-11 flex-row items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 shadow-sm shadow-black/5 dark:bg-input/30 dark:active:bg-input/50 sm:h-9',
          Platform.select({
            web: 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-fit whitespace-nowrap text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed dark:hover:bg-input/50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
          }),
          disabled && 'opacity-50',
          className
        )}>
        {value.length === 0 ? (
          <Typography variant={'muted'}>{placeholder}</Typography>
        ) : (
          <Typography>{renderValue()}</Typography>
        )}
        <Icon as={ChevronDown} aria-hidden={true} className="size-4 text-muted-foreground" />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
          <SelectPrimitive.Content className="rounded-md border border-border bg-popover p-1">
            <SelectPrimitive.Viewport>
              {options.map((option) => {
                const selected = value.includes(option.value);

                return (
                  <Button
                    className="flex justify-start gap-2"
                    variant={'ghost'}
                    key={option.value}
                    onPress={() => toggle(option.value)}>
                    <Checkbox
                      id={option.value}
                      checked={selected}
                      onCheckedChange={() => toggle(option.value)}
                    />
                    <Typography>{option.label}</Typography>
                  </Button>
                );
              })}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Overlay>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
