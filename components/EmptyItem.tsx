import { Button } from '@/components/ui/button';
import { CardContent, CardRoot } from '@/components/ui/card';
import { Typography } from '@/components/ui/text';
import { View } from 'react-native';

interface Props {
  title: string;
  desc: string;
  onPress: () => void;
  buttonText: string;
}

export function EmptyItem({ title, desc, buttonText, onPress }: Props) {
  return (
    <View className="flex flex-1 items-center justify-center">
      <CardRoot>
        <CardContent className="flex items-center justify-center gap-2">
          <Typography variant={'large'}>{title}</Typography>
          <Typography variant={'muted'}>{desc}</Typography>
          <Button onPress={onPress} className="mt-4">
            <Typography>{buttonText}</Typography>
          </Button>
        </CardContent>
      </CardRoot>
    </View>
  );
}
