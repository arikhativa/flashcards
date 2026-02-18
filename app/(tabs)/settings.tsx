import SettingsForm from '@/components/settings/SettingsForm';
import { Typography } from '@/components/ui/text';
import useConfig from '@/hooks/query/useConfig';
import { View } from 'react-native';

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
      <Typography>Failed to get data</Typography>
    </View>
  );
}
