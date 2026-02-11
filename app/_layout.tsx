import '@/global.css';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import useDBMigrations from '@/hooks/useDBMigration';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { expoDBFile } from '@/lib/db';
// import useDBSeed from '@/hooks/useDBSeed';
import { PortalHost } from '@rn-primitives/portal';
import useSetupConfig from '@/hooks/useSetupConfig';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const queryClient = new QueryClient();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  useDrizzleStudio(__DEV__ ? expoDBFile : null);
  const status = useDBMigrations();
  useSetupConfig(status);
  // useDBSeed();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
