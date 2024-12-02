import {getRandomIndex} from '../../utils/generic';
import {useState} from 'react';
import {View} from 'react-native';
import {Surface, useTheme} from 'react-native-paper';

interface Plaster {
  width: number;
  rotation: number;
}

interface PlasterProps {
  cardHeight: number;
}

export default function Plasters({cardHeight}: PlasterProps) {
  const p0: Plaster[] = [
    {
      width: cardHeight * 2, // 230
      rotation: -12,
    },
    {
      width: cardHeight * 1.739130435, // 200
      rotation: 20,
    },
  ];

  const p1: Plaster[] = [
    {
      width: cardHeight * 1.565217391, // 180
      rotation: -15,
    },
    {
      width: cardHeight * 2.173913043, // 250
      rotation: 10,
    },
  ];

  const p2: Plaster[] = [
    {
      width: cardHeight * 1.913043478, // 220
      rotation: -10,
    },
    {
      width: cardHeight * 0.6956521739, //  80
      rotation: 80,
    },
  ];

  const p3: Plaster[] = [
    {
      width: cardHeight * 2.3, // 290 - something
      rotation: 5,
    },
  ];

  const p4: Plaster[] = [
    {
      width: cardHeight * 1.565217391, // 180
      rotation: -10,
    },
    {
      width: cardHeight * 0.8695652174, // 100
      rotation: -30,
    },
  ];

  const p5: Plaster[] = [
    {
      width: cardHeight * 0.6956521739, //  80
      rotation: 70,
    },
    {
      width: cardHeight * 1.739130435, // 200
      rotation: -10,
    },
  ];

  const p6: Plaster[] = [
    {
      width: cardHeight * 1.043478261, // 120
      rotation: 25,
    },
  ];

  const allPlasters = [p0, p1, p2, p3, p4, p5, p6];

  const [randomIndex] = useState(() => getRandomIndex(allPlasters.length));

  const {colors} = useTheme();

  const getPlasters = (list: Plaster[]) => {
    const ret = list.map((p, index) => {
      return (
        <Surface
          key={index}
          elevation={2}
          style={{
            borderRadius: 10,
            backgroundColor: colors.primaryContainer,
            alignSelf: 'center',
            position: 'absolute',
            zIndex: index + 5,
            transform: [{rotate: `${p.rotation}deg`}],
          }}
          children={
            <View style={{width: p.width, height: cardHeight * 0.25}} />
          }
        />
      );
    });
    return <View>{ret}</View>;
  };

  return getPlasters(allPlasters[randomIndex]);
}
