import { capitalize } from 'typedash';

export function createColorPreset<
  const TColorPresetConfig extends ColorPresetConfig<string>,
>(config: TColorPresetConfig) {
  return {
    ...config,
    label: config.label || capitalize(config.label ?? ''),
  };
}

interface ColorPresetConfig<TKey extends string> {
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
