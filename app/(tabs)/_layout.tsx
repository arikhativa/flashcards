import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Tabs } from 'expo-router';
import { Cog, Files, Tags } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color }) => <Files />,
        }}
      />
      <Tabs.Screen
        name="tags"
        options={{
          title: 'Tags',
          tabBarIcon: ({ color }) => <Tags />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Icon as={Cog} className={cn('size-7', focused ? 'text-primary' : '')} />
          ),
        }}
      />
    </Tabs>
  );
}
