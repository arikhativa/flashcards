import MainScreen from '@/components/MainScreen';
import SettingsForm from '@/components/settings/SettingsForm';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/text';
import { reset, seed } from '@/db/seed';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { View } from 'react-native';

export default function Tab() {
  const { data } = useSuspenseConfig();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      console.info('🌱 Seeding database...');

      return seed();
    },
    onSuccess: () => {
      console.info('✅ Seed complete');
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (e) => {
      console.error('❌ Seed failed:', e);
    },
  });

  const { mutate: resetDB } = useMutation({
    mutationFn: async () => {
      console.info('Resetting database...');

      return reset();
    },
    onSuccess: () => {
      console.info('✅ DB is empty');
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
    onError: (e) => {
      console.error('❌ Resetting failed:', e);
    },
  });

  return (
    <MainScreen className="flex flex-col gap-6 py-10">
      <SettingsForm className="flex-1" conf={data} />
      {__DEV__ && (
        <View className="flex gap-4">
          <Button variant={'destructive'}>
            <Typography onPress={() => mutate()}>Seed DB</Typography>
          </Button>
          <Button variant={'destructive'}>
            <Typography onPress={() => resetDB()}>Empty DB</Typography>
          </Button>
          <Button variant={'outline'}>
            <Typography
              onPress={() => {
                queryClient.invalidateQueries({ queryKey: [] });
                console.info('Cache is Cleared');
              }}>
              Clear cache
            </Typography>
          </Button>
        </View>
      )}
    </MainScreen>
  );
}
