import { capitalize } from 'typedash';

export function createColorPreset<
  const TColorPresetConfig extends ColorPresetConfig<string>,
>({ label, ...config }: TColorPresetConfig) {
  return {
    ...config,
    label: label || capitalize(label ?? ''),
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
