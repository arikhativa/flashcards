import { Plaster, PlasterProps } from '@/components/test/Plaster';
import { Typography } from '@/components/ui/text';
import { getRandomIndex } from '@/lib/utils';
import { useMemo } from 'react';
import { View } from 'react-native';

const p0: PlasterProps[] = [
  {
    size: 'lg',
    rotation: -24,
  },
  {
    size: 'sm',
    rotation: 0,
  },
  {
    size: 'md',
    rotation: 30,
  },
] as const;

const p1: PlasterProps[] = [
  {
    size: 'sm',
    rotation: -50,
  },
  {
    size: 'md',
    rotation: 18,
  },
] as const;

const p2: PlasterProps[] = [
  {
    size: 'lg',
    rotation: 12,
  },
  {
    size: 'md',
    rotation: -25,
  },
] as const;

const p3: PlasterProps[] = [
  {
    size: 'lg',
    rotation: 4,
  },
  {
    size: 'lg',
    rotation: -43,
  },
] as const;

const p4: PlasterProps[] = [
  {
    size: 'md',
    rotation: 20,
  },
  {
    size: 'sm',
    rotation: -73,
  },
  {
    size: 'sm',
    rotation: -27,
  },
] as const;

const p5: PlasterProps[] = [
  {
    size: 'lg',
    rotation: 16,
  },
  {
    size: 'md',
    rotation: 65,
  },
  {
    size: 'sm',
    rotation: -17,
  },
] as const;

const p6: PlasterProps[] = [
  {
    size: 'lg',
    rotation: 8,
  },
  {
    size: 'sm',
    rotation: 52,
  },
  {
    size: 'md',
    rotation: -7,
  },
] as const;

const allPlasters = [p0, p1, p2, p3, p4, p5, p6] as const;

export function Plasters() {
  const randomIndex = useMemo(() => getRandomIndex(allPlasters.length), []);

  return (
    <View>
      <Typography className="text-center">{'...'}</Typography>
      <View className="absolute inset-0 flex items-center justify-center">
        {allPlasters[randomIndex].map((props, index) => (
          <Plaster key={`${index} + ${randomIndex} + `} {...props}></Plaster>
        ))}
      </View>
    </View>
  );
}
