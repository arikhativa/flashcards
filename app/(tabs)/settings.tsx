import MainScreen from '@/components/MainScreen';
import SettingsForm from '@/components/settings/SettingsForm';
import { useSuspenseConfig } from '@/hooks/query/useConfig';

export default function Tab() {
  const { data } = useSuspenseConfig();

  return (
    <MainScreen>
      <SettingsForm conf={data} />
    </MainScreen>
  );
}
