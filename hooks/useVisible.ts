import {useState} from 'react';

export function useVisible(initialState: boolean | (() => boolean) = false) {
  const [visible, setVisible] = useState(initialState);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return {
    visible,
    toggleVisible,
  };
}
