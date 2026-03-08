import CardForm from '@/components/card/CardForm';
import useCard from '@/hooks/query/useCard';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import * as z from 'zod';
import { View } from 'react-native';
import { Typography } from '@/components/ui/text';
import { useEffect } from 'react';
import { BAD_ID } from '@/lib/constants';

const schema = z.object({
  id: z.string().transform(Number).pipe(z.number().int().positive()),
});

export default function CardDetailed() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { error, success, data } = schema.safeParse({ id });

  useEffect(() => {
    if (success) {
      navigation.setOptions({ title: 'Card #' + id });
    }
  }, [success, navigation, id]);

  const q = useCard(success ? data.id : BAD_ID);

  if (!success) {
    console.error('CardDetailed: bad id: ', error);
    return <Redirect href="/+not-found" />;
  }

  if (!q.data && q.isFetched) {
    console.error('CardDetailed: no data');
    return <Redirect href="/+not-found" />;
  }

  if (q.data) {
    return (
      <View className="flex-1">
        <CardForm card={q.data} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Typography>Loading</Typography>
    </View>
  );
}
