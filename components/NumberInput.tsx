import { useEffect, useState } from "react";
import TextInput from "./TextInput";

interface NumberInputProps {
  onValueChange: (value: number) => void;
  value?: number;
  label?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function NumberInput({
  onValueChange,
  value,
  label,
  min,
  max,
  disabled,
}: NumberInputProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [valueLocal, setValueLocal] = useState<string>(
    value === undefined ? "" : value.toString()
  );

  useEffect(() => {
    if (value === undefined) {
      setValueLocal("");
    } else {
      setValueLocal(value.toString());
    }
  }, [value]);

  const handleValueChange = (value: string) => {
    setValueLocal(value);

    if (value) {
      const numberPattern = /^-?\d+$/;

      if (!numberPattern.test(value)) {
        setError("Please enter numbers only");
        return;
      }
      const num = parseInt(value, 10);
      if (min !== undefined && num < min) {
        setError(`Value must be larger than ${min}`);
        return;
      }
      if (max !== undefined && num > max) {
        setError(`Value must be smaller than ${max}`);
        return;
      }
      onValueChange(num);
    }
    setError("");
  };

  return (
    <TextInput
      disabled={disabled}
      keyboardType="numeric"
      value={valueLocal}
      onValueChange={handleValueChange}
      label={label}
      error={error}
    ></TextInput>
  );
}
