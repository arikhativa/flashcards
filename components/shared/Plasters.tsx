import { getRandomIndex } from "@/utils/generic";
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
      width: 320,
      rotation: 7,
    },
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
      width: 300,
      rotation: -5,
    },
    {
      width: 180,
      rotation: -15,
    },
    {
      width: 250,
      rotation: 20,
    },
  ];

  const p2: Plaster[] = [
    {
      width: 280,
      rotation: -18,
    },
    {
      width: 120,
      rotation: 80,
    },
  ];

  const p3: Plaster[] = [
    {
      width: 170,
      rotation: -45,
    },
    {
      width: 290,
      rotation: 5,
    },
  ];

  const p4: Plaster[] = [
    {
      width: 170,
      rotation: 45,
    },
    {
      width: 250,
      rotation: 15,
    },
    {
      width: 250,
      rotation: -30,
    },
    {
      width: 180,
      rotation: -10,
    },
  ];

  const p5: Plaster[] = [
    {
      width: 140,
      rotation: -60,
    },
    {
      width: 310,
      rotation: 10,
    },
    {
      width: 150,
      rotation: 70,
    },
    {
      width: 200,
      rotation: -20,
    },
  ];

  const p6: Plaster[] = [
    {
      width: 200,
      rotation: -20,
    },
    {
      width: 310,
      rotation: -5,
    },
    {
      width: 100,
      rotation: 95,
    },
  ];

  const allPlasters = [p0, p1, p2, p3, p4, p5, p6];

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

  const getRandomPlaster = () => {
    const i = getRandomIndex(allPlasters.length);
    const p = allPlasters[i];
    return getPlasters(p);
  };

  return getRandomPlaster();
}
