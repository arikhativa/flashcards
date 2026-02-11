import useConfig from '@/hooks/query/useConfig';
import { View, Text } from 'react-native';

export default function Tab() {
  const { data } = useConfig();

  console.log('data', data);

  return (
    <View className="flex-1">
      <Text>config</Text>
    </View>
  );
}
