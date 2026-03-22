import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Tabs } from 'expo-router';
import { Cog, Files, LucideIcon, Tags } from 'lucide-react-native';
import { View } from 'react-native';

function TabBarIcon({ icon, focused }: { icon: LucideIcon; focused: boolean }) {
  return (
    <View className={cn('flex rounded-2xl px-3 py-1', focused ? 'bg-primary/10' : '')}>
      <Icon as={icon} className={cn('size-5')} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          height: 85,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <View className="absolute bottom-6 left-8 right-8 h-16 rounded-3xl border-2 border-primary bg-gray-300/95 shadow-lg" />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: () => <Typography className="text-[10px]">Cards</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Files} />,
        }}
      />
      <Tabs.Screen
        name="tags"
        options={{
          headerShown: false,
          tabBarLabel: () => <Typography className="text-[10px]">Tags</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Tags} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: () => <Typography className="text-[10px]">Settings</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Cog} />,
        }}
      />
    </Tabs>
  );
}
