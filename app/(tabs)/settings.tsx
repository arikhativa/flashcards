import MainScreen from '@/components/MainScreen';
import { useGlobalHeader } from '@/components/provider/GlobalHeaderProvider';
import SettingsForm from '@/components/settings/SettingsForm';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/text';
import { seed } from '@/db/seed';
import { useSuspenseConfig } from '@/hooks/query/useConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function Tab() {
  const { setState } = useGlobalHeader();
  const { data } = useSuspenseConfig();
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      setState({
        title: 'Settings',
        titleType: 'text',
        node: null,
      });
    }, [])
  );

  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log('🌱 Seeding database...');

      return seed();
    },
    onSuccess: () => {
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
    <MainScreen className="flex flex-col gap-6 pt-10">
      <SettingsForm conf={data} />
      {__DEV__ && (
        <>
          <Button variant={'destructive'}>
            <Typography onPress={() => mutate()}>Seed DB</Typography>
          </Button>
          <Button variant={'outline'}>
            <Typography
              onPress={() => {
                queryClient.invalidateQueries({ queryKey: [] });
                console.log('Cache is Cleared');
              }}>
              Clear cache
            </Typography>
          </Button>
        </>
      )}
    </MainScreen>
  );
}
