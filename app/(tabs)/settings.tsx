import SettingsForm from '@/components/settings/SettingsForm';
import useConfig from '@/hooks/query/useConfig';
import { View, Text } from 'react-native';

export default function Tab() {
  const { data } = useConfig();

  if (data) {
    return (
      <View className="flex-1">
        <SettingsForm conf={data} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text>Failed to get data</Text>
    </View>
  );
}
