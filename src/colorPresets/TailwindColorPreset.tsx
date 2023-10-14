import { CompassIcon } from 'lucide-react';
import tailwindColors from 'tailwindcss/colors';
import { mapValues, pick } from 'typedash';
import { ColorScale, createColorPreset } from './_internal/createColorPreset';

const defaultTailwindColors = tailwindColors;

const colorPalette = mapValues(
  pick(defaultTailwindColors, value => typeof value === 'object') as Record<
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
