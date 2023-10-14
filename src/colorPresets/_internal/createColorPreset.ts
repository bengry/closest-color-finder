import { capitalize } from 'typedash';

export function createColorPreset<
  const TKey extends string,
  TColorPresetConfig extends ColorPresetConfig<TKey>,
>(config: TColorPresetConfig) {
  return {
    ...config,
    label: config.label || capitalize(config.label ?? ''),
  };
}

export interface ColorPresetConfig<TKey extends string> {
  key: TKey;
  label?: string;
  icon?: React.ReactNode;
  palette: ColorPalette;
}

export interface ColorPalette {
  [colorName: string]: ColorScale;
}

export type ColorScale = Record<
  ThemeType,
  {
    [scale: string | number]: string;
  }
>;

export type ThemeType = 'light' | 'dark';
