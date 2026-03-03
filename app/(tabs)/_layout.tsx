import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Tabs } from 'expo-router';
import { Cog, Files, LucideIcon, Tags } from 'lucide-react-native';
import { View } from 'react-native';

function TabBarIcon({ icon, focused }: { icon: LucideIcon; focused: boolean }) {
  return (
    <View
      className={cn(
        'flex rounded-2xl px-3 py-1',
        focused ? 'bg-foreground/10 dark:bg-background/80' : ''
      )}>
      <Icon as={icon} className={cn('size-5')} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: () => <Typography className="mt-0.5 text-[10px]">Cards</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Files} />,
        }}
      />
      <Tabs.Screen
        name="tags"
        options={{
          headerShown: false,
          tabBarLabel: () => <Typography className="mt-0.5 text-[10px]">Tags</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Tags} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: () => <Typography className="mt-0.5 text-[10px]">Settings</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Cog} />,
        }}
      />
    </Tabs>
  );
}
