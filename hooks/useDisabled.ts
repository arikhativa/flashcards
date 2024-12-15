import {useState} from 'react';

export function useDisabled() {
  const [isDisabled, setIsDisabled] = useState(false);

  const setDisabledForTime = (time: number) => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), time);
  };

  const setDisabled = (value: boolean) => {
    setIsDisabled(value);
  };

  return {isDisabled, setDisabledForTime, setDisabled};
}
