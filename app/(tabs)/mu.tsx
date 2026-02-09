import { Button } from '@/components/ui/button';
import { usersTable } from '@/db/schema';
import { db } from '@/lib/db';
import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  const onPressIn = async () => {
    const users = await db.select().from(usersTable);
    console.log('E', users);
  };
  return (
    <View style={styles.container}>
      <Button onPressIn={onPressIn}>
        <Text className="text-lg text-white">Mu</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
