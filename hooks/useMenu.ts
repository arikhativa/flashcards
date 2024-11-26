import { useState } from "react";

export function useMenu() {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return { visible, openMenu, closeMenu };
}
