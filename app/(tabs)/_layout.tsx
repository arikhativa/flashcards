import { Tabs } from 'expo-router';
import { Cog, Home } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color }) => <Home />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Cog />,
        }}
      />
    </Tabs>
  );
}
