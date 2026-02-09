import { Button } from '@/components/ui/button';
import { CardInsert } from '@/db/schema';
import useCardEdit from '@/hooks/mutation/useCardEdit';
import useCardList from '@/hooks/query/useCardList';
import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  const { data } = useCardList();
  if (data) {
    for (const e of data) {
      console.log('e', e.cardToTags);
    }
  }

  const { create } = useCardEdit();

  const onPressIn = async () => {
    const c: CardInsert = {};
    create(c);
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
