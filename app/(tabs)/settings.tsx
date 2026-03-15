import MainScreen from '@/components/MainScreen';
import SettingsForm from '@/components/settings/SettingsForm';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/text';
import { seed } from '@/db/seed';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const { data } = useSuspenseConfig();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log('🌱 Seeding database...');

      return seed();
    },
    onSuccess: (data) => {
      console.log('✅ Seed complete');
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (e) => {
      console.error('❌ Seed failed:', e);
    },
  });

  return (
    <SafeAreaView className="flex-1">
      <MainScreen className="flex flex-col gap-6">
        <SettingsForm conf={data} />
        <Button variant={'destructive'}>
          <Typography onPress={() => mutate()}>Seed DB</Typography>
        </Button>
      </MainScreen>
    </SafeAreaView>
  );
}
