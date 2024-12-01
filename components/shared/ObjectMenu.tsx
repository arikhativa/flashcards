import { Menu } from "react-native-paper";

interface ObjectMenuProps {
  visible: boolean;
  onArchive?: () => void;
  deleteMessage: string;
  onDelete: () => void;
  closeMenu: () => void;
  anchor: React.ReactNode;
}

export default function ObjectMenu({
  visible,
  deleteMessage,
  closeMenu,
  onDelete,
  anchor,
}: ObjectMenuProps) {
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      anchor={anchor}
    >
      <Menu.Item
        onPress={() => {
          if (visible) {
            closeMenu();
            onDelete();
          }
        }}
        title={deleteMessage}
      />
    </Menu>
  );
}
