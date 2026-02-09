import { Tabs } from 'expo-router';
import { Home, Pen } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home />,
        }}
      />
      <Tabs.Screen
        name="mu"
        options={{
          title: 'Mu',
          tabBarIcon: ({ color }) => <Pen />,
        }}
      />
    </Tabs>
  );
}
