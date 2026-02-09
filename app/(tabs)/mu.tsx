import { Button } from '@/components/ui/button';
import useUsers from '@/hooks/query/useUsers';
import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  const { data, isFetched } = useUsers();
  const onPressIn = async () => {
    console.log('isFetched', isFetched);
    console.log('E', data);
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
