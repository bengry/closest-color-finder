import { CompassIcon } from 'lucide-react';
import * as TailwindColors from 'tailwindcss/colors';
import { mapValues, pick } from 'typedash';
import { ColorScale, createColorPreset } from './_internal/createColorPreset';

const colorPalette = mapValues(
  pick(TailwindColors, value => typeof value === 'object') as Record<
    string,
    Record<string, string>
  >,
  (value): ColorScale => ({
    light: value,
  })
);

export const TailwindColorPreset = createColorPreset({
  key: 'tailwind',
  label: 'Tailwind',
  icon: <CompassIcon />,
  palette: colorPalette,
});
