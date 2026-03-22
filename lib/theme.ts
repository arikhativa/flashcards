import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(315 29% 97%)',
    foreground: 'hsl(325 33% 7%)',
    card: 'hsl(315 29% 97%)',
    cardForeground: 'hsl(325 33% 7%)',
    popover: 'hsl(315 29% 97%)',
    popoverForeground: 'hsl(325 33% 7%)',
    primary: 'hsl(326 85% 74%)',
    primaryForeground: 'hsl(325 33% 7%)',
    secondary: 'hsl(239.99 4% 96%)',
    secondaryForeground: 'hsl(325 33% 7%)',
    muted: 'hsl(265 8% 96%)',
    mutedForeground: 'hsl(325 33% 7%)',
    accent: 'hsl(179.98 7% 95%)',
    accentForeground: 'hsl(325 33% 7%)',
    destructive: 'hsl(20 68% 51%)',
    border: 'hsl(191.98 11% 90%)',
    input: 'hsl(191.98 11% 90%)',
    ring: 'hsl(192.01 8% 64%)',

    radius: '0.625rem',
    chart1: 'hsl(12 76% 61%)',
    chart2: 'hsl(173 58% 39%)',
    chart3: 'hsl(197 37% 24%)',
    chart4: 'hsl(43 74% 66%)',
    chart5: 'hsl(27 87% 67%)',

    // custom
    learning: 'hsl(3 17.1% 43.5%)',
    gettingThere: 'hsl(150 52.4% 50.6%)',
    confident: 'hsl(270 50% 40%)',
  },
  dark: {
    background: 'hsl(246 21% 15%)',
    foreground: 'hsl(248 13% 98%)',
    card: 'hsl(265 14% 23%)',
    cardForeground: 'hsl(248 13% 98%)',
    popover: 'hsl(265 14% 23%)',
    popoverForeground: 'hsl(248 13% 98%)',
    primary: 'hsl(284 43% 58%)',
    primaryForeground: 'hsl(293 33% 96%)',
    secondary: 'hsl(286 6% 28%)',
    secondaryForeground: 'hsl(0 0% 98%)',
    muted: 'hsl(257 11% 29%)',
    mutedForeground: 'hsl(261 14% 69%)',
    accent: 'hsl(257 11% 29%)',
    accentForeground: 'hsl(248 13% 98%)',
    destructive: 'hsl(15 54% 64%)',
    // border: 'hsl(349.27 99% 46%)',
    border: 'hsl(191.98 11% 90%)',
    input: 'hsl(191.98 11% 90%)',
    ring: 'hsl(264 6% 56%)',

    radius: '0.625rem',
    chart1: 'hsl(220 70% 50%)',
    chart2: 'hsl(160 60% 45%)',
    chart3: 'hsl(30 80% 55%)',
    chart4: 'hsl(280 65% 60%)',
    chart5: 'hsl(340 75% 55%)',

    // custom
    learning: 'hsl(16 82.6% 27.1%)',
    gettingThere: 'hsl(160 100% 36.9%)',
    confident: 'hsl(273 100% 63.7%)',
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
