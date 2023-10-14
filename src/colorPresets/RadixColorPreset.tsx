import * as RadixColors from '@radix-ui/colors';
import { ComponentIcon } from 'lucide-react';
import { KeysOfUnion, assert, mapKeys, objectEntries, omit } from 'typedash';
import { ColorPalette, createColorPreset } from './_internal/createColorPreset';

const colorPalette = objectEntries(
  omit(RadixColors, (_, key) => /(P3|A)$/.test(key))
).reduce((draft, [key, value]) => {
  assert(value != null);

  const themeType = key.endsWith('Dark') ? 'dark' : 'light';
  const colorName = key.match(/^([a-z]+)(Dark)?$/)?.at(1);
  if (colorName == null) return draft;

  const values: Partial<Record<string, string>> = mapKeys(
    value,
    (key: KeysOfUnion<typeof value>) => key.replace(colorName, '')
  );

  draft[colorName] ??= {
    dark: {},
    light: {},
  };

  const themeColorPalette = draft[colorName][themeType]!;

  Object.assign(themeColorPalette, values);

  return draft;
}, {} as ColorPalette);

export const RadixColorPreset = createColorPreset({
  key: 'radix',
  label: 'Radix',
  icon: <ComponentIcon />,
  palette: colorPalette,
});
