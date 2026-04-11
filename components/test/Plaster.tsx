import { View } from 'react-native';

export interface PlasterProps {
  size: 'sm' | 'md' | 'lg';
  rotation?: number;
}

interface S {
  m: string;
  p: string;
  dots: number;
  cnDots: string;
}

const lg = {
  m: 'h-[3rem] w-[10rem]',
  p: 'h-[2rem] w-[7rem]',
  dots: 8,
  cnDots: 'w-[2rem]',
};

const md = {
  m: 'h-[2.5rem]  w-[9rem]',
  p: 'h-[1.75rem] w-[7rem]',
  dots: 6,
  cnDots: 'w-[1.5rem]',
};

const sm = {
  m: 'h-[2rem]  w-[8rem]',
  p: 'h-[1.25rem] w-[6rem]',
  dots: 3,
  cnDots: 'w-[2rem]',
};

const className: Record<PlasterProps['size'], S> = {
  lg: lg,
  md: md,
  sm: sm,
} as const;

export function Plaster({ size, rotation = 0 }: PlasterProps) {
  return (
    <View
      className={`absolute z-10 ${className[size].m} rounded-full border-2 border-pink-200 bg-pink-100`}
      style={{
        transform: [{ rotateZ: `${rotation}deg` }],
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      }}>
      {/* Padded center section */}
      <View className="absolute inset-0 flex items-center justify-center">
        <View
          className={`flex ${className[size].p} items-center justify-center rounded-lg border border-pink-200 bg-pink-50`}>
          {/* Gauze dots pattern */}
          <View
            className={`flex ${className[size].cnDots} flex-row flex-wrap items-center justify-center gap-1`}>
            {Array.from({ length: className[size].dots }).map((_, i) => (
              <View key={i} className="h-1 w-1 rounded-full bg-pink-400 opacity-60" />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
