import MainScreen from '@/components/MainScreen';
import SettingsForm from '@/components/settings/SettingsForm';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const { data } = useSuspenseConfig();

  return (
    <SafeAreaView className="flex-1">
      <MainScreen className="flex flex-col gap-6">
        <SettingsForm conf={data} />
      </MainScreen>
    </SafeAreaView>
  );
}
