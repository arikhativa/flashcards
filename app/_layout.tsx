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
import { PortalHost } from '@rn-primitives/portal';
import useSetupConfig from '@/hooks/useSetupConfig';
import { TestProvider } from '@/components/provider/TestProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalHeaderProvider } from '@/components/provider/GlobalHeaderProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const queryClient = new QueryClient();

export default function RootLayout() {
  const { toggleColorScheme, colorScheme } = useColorScheme();

  useEffect(() => {
    if (colorScheme === 'dark') {
      toggleColorScheme();
    }
  }, [colorScheme, toggleColorScheme]);

  useDrizzleStudio(__DEV__ ? expoDBFile : null);
  const status = useDBMigrations();
  useSetupConfig(status);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <GlobalHeaderProvider>
          <GestureHandlerRootView>
            <TestProvider>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              <SafeAreaView className="flex-1">
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
              </SafeAreaView>
              <PortalHost />
            </TestProvider>
          </GestureHandlerRootView>
        </GlobalHeaderProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
