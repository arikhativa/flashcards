import { Spinner } from '@/components/external/Spinner';
import { View } from 'react-native';

export default function ScreenSpinner() {
  return (
    <View className="flex flex-1 items-center justify-center">
      <Spinner />
    </View>
  );
}
