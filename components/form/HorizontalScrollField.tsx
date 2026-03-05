import { Button } from '@/components/ui/button';
import { CardContent, CardRoot } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

interface Props {
  label: string;
  onAdd?: () => void;
  children: React.ReactNode;
}

export default function HorizontalScrollField({ label, onAdd, children }: Props) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row justify-between">
        <Label>{label}</Label>
        <Button variant={'outline'} size={'icon'} onPress={onAdd}>
          <Icon as={Plus} />
        </Button>
      </View>
      <CardRoot>
        <CardContent className="px-0">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="flex flex-row gap-4 px-2">
            {children}
          </ScrollView>
        </CardContent>
      </CardRoot>
    </View>
  );
}
