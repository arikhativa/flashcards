import { KeyboardTypeOptions } from "react-native";
import { TextInput as TextInputPaper } from "react-native-paper";
import InputHelper from "./InputHelper";

type InputHelperProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export default function TextInput({
  value,
  onValueChange,
  label,
  disabled,
  error,
  keyboardType,
}: InputHelperProps) {
  return (
    <InputHelper error={error}>
      <TextInputPaper
        disabled={disabled}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onValueChange}
        label={label}
        error={error ? true : false}
      ></TextInputPaper>
    </InputHelper>
  );
}
