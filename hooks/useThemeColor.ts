/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    primary: '#2f95dc',
    secondary: '#666666',
    border: '#CCCCCC',
    card: '#FFFFFF',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    primary: '#4DA1E8',
    secondary: '#999999',
    border: '#333333',
    card: '#1C1C1E',
  },
};

export type ColorName = keyof typeof Colors.light;

export function useThemeColor(
  colorName: ColorName,
  props?: { light?: string; dark?: string }
): string {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props && props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}
