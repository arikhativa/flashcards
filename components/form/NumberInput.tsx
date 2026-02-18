import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface NumberInputProps {
  id?: string;
  value: number | undefined;
  onChange: (value: number) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

export function NumberInput({ value, onChange, ...props }: NumberInputProps) {
  const [localValue, setLocalValue] = useState(value?.toString() ?? '');

  useEffect(() => {
    const numericLocal = parseFloat(localValue);
    if (value !== numericLocal && !(isNaN(numericLocal) && value === 0)) {
      setLocalValue(value?.toString() ?? '');
    }
  }, [value]);

  const handleChange = (text: string) => {
    const numericValue = parseFloat(text);

    onChange(isNaN(numericValue) ? 0 : numericValue);
  };

  return (
    <Input
      {...props}
      value={localValue}
      onChangeText={handleChange}
      keyboardType="numeric"
      returnKeyType="done"
    />
  );
}
