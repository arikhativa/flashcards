import { getRandomIndex } from "@/utils/generic";
import { useState } from "react";
import { View } from "react-native";
import { Surface, useTheme } from "react-native-paper";

interface Plaster {
  width: number;
  rotation: number;
}

interface PlasterProps {}

export default function Plasters({}: PlasterProps) {
  const p0: Plaster[] = [
    {
      width: 230,
      rotation: -12,
    },
    {
      width: 200,
      rotation: 20,
    },
  ];

  const p1: Plaster[] = [
    {
      width: 180,
      rotation: -15,
    },
    {
      width: 250,
      rotation: 10,
    },
  ];

  const p2: Plaster[] = [
    {
      width: 220,
      rotation: -10,
    },
    {
      width: 80,
      rotation: 80,
    },
  ];

  const p3: Plaster[] = [
    {
      width: 290,
      rotation: 5,
    },
  ];

  const p4: Plaster[] = [
    {
      width: 180,
      rotation: -10,
    },
    {
      width: 100,
      rotation: -30,
    },
  ];

  const p5: Plaster[] = [
    {
      width: 80,
      rotation: 70,
    },
    {
      width: 200,
      rotation: -10,
    },
  ];

  const p6: Plaster[] = [
    {
      width: 120,
      rotation: 25,
    },
  ];

  const allPlasters = [p0, p1, p2, p3, p4, p5, p6];

  const [randomIndex] = useState(() => getRandomIndex(allPlasters.length));

  const { colors } = useTheme();

  const getPlasters = (list: Plaster[]) => {
    const ret = list.map((p, index) => {
      return (
        <Surface
          key={index}
          elevation={2}
          style={{
            borderRadius: 10,
            backgroundColor: colors.primaryContainer,
            alignSelf: "center",
            position: "absolute",
            zIndex: index + 5,
            transform: [{ rotate: `${p.rotation}deg` }],
          }}
          children={<View style={{ width: p.width, height: 40 }}></View>}
        ></Surface>
      );
    });
    return <View>{ret}</View>;
  };

  return getPlasters(allPlasters[randomIndex]);
}
