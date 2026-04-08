import { CardListHeader } from '@/components/card/CardListHeader';
import { GlobalHeader } from '@/components/GlobalHeader';
import { TagListHeader } from '@/components/tag/TagListHeader';
import { Icon } from '@/components/ui/icon';
import { Typography } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Tabs } from 'expo-router';
import { Cog, Files, LucideIcon, Tags } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

function TabBarIcon({ icon, focused }: { icon: LucideIcon; focused: boolean }) {
  return (
    <View className={cn('mb-1 flex rounded-2xl px-4 py-1', focused ? 'bg-primary/50' : '')}>
      <Icon as={icon} className={cn('size-5')} />
    </View>
  );
}

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          height: 78,
          paddingTop: 4,
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          borderWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          header: () => (
            <GlobalHeader
              title="ffflashcards"
              titleClassName="text-primary"
              node={<CardListHeader />}
            />
          ),
          tabBarLabel: () => <Typography className="text-[11px] font-bold">Cards</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Files} />,
        }}
      />
      <Tabs.Screen
        name="tags"
        options={{
          header: () => <GlobalHeader title="Tags" node={<TagListHeader />} />,
          tabBarLabel: () => <Typography className="text-[11px] font-bold">Tags</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Tags} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          header: () => <GlobalHeader title="Settings" />,
          tabBarLabel: () => <Typography className="text-[11px] font-bold">Settings</Typography>,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Cog} />,
        }}
      />
    </Tabs>
  );
}
