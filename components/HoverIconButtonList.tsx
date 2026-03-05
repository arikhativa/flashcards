import { View } from 'react-native';

export default function HoverIconButtonList({ children }: { children: React.ReactNode }) {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex flex-row-reverse gap-4 p-4">
      {children}
    </View>
  );
}
