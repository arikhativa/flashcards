import { KeyboardTypeOptions } from "react-native";
import { TextInput as TextInputPaper } from "react-native-paper";
import InputHelper from "./InputHelper";

type InputHelperProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
};

export default function TextInput({
  value,
  onValueChange,
  label,
  error,
  keyboardType,
}: InputHelperProps) {
  return (
    <InputHelper error={error}>
      <TextInputPaper
        keyboardType={keyboardType}
        value={value}
        onChangeText={onValueChange}
        label={label}
        error={error ? true : false}
      ></TextInputPaper>
    </InputHelper>
  );
}
