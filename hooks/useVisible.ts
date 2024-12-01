import { useState } from "react";

export function useVisible() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return {
    visible,
    toggleVisible,
  };
}
