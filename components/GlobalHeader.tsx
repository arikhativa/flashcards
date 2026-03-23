import { useGlobalHeader } from '@/components/provider/GlobalHeaderProvider';
import { Typography } from '@/components/ui/text';
import { View } from 'react-native';
import { Image } from 'expo-image';

export function GlobalHeader() {
  const { state } = useGlobalHeader();

  if (!state) return null;

  return (
    <View className="flex flex-col px-3 pt-1">
      <View className="">
        {state?.titleType === 'text' && (
          <Typography className="text-xl font-bold">{state.title}</Typography>
        )}
        {state?.titleType === 'image' && (
          <Image style={{ width: 100, height: 45 }} source={state.title} contentFit="contain" />
        )}
      </View>
      {state.node && <View>{state.node}</View>}
    </View>
  );
}
