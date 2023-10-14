import * as RadixColors from '@radix-ui/colors';
import { Wand2Icon } from 'lucide-react';
import { mapKeys, pick } from 'typedash';
import { RadixColorPreset } from './RadixColorPreset';
import { ColorScale, createColorPreset } from './_internal/createColorPreset';

const blue: ColorScale = {
  light: {
    '1': 'hsl(225, 100%, 99%)',
    '2': 'hsl(216, 100%, 98%)',
    '3': 'hsl(218, 100%, 95%)',
    '4': 'hsl(219, 100%, 83%)',
    '5': 'hsl(219, 100%, 79%)',
    '6': 'hsl(219, 100%, 74%)',
    '7': 'hsl(219, 100%, 65%)',
    '8': 'hsl(219, 92%, 54%)',
    '9': 'hsl(219, 98%, 47%)',
    '10': 'hsl(219, 93%, 42%)',
    '11': 'hsl(219, 98%, 35%)',
    '12': 'hsl(218, 100%, 9%)',
  },
  dark: {
    '1': 'hsl(219, 74%, 8%)',
    '2': 'hsl(219, 73%, 10%)',
    '3': 'hsl(219, 72%, 15%)',
    '4': 'hsl(219, 81%, 16%)',
    '5': 'hsl(219, 93%, 22%)',
    '6': 'hsl(219, 98%, 25%)',
    '7': 'hsl(219, 100%, 29%)',
    '8': 'hsl(219, 100%, 33%)',
    '9': 'hsl(219, 89%, 52%)',
    '10': 'hsl(219, 92%, 55%)',
    '11': 'hsl(219, 100%, 64%)',
    '12': 'hsl(219, 100%, 89%)',
  },
};

const gray: ColorScale = {
  light: generateColorScale(RadixColors.slate),
  dark: generateColorScale(RadixColors.slateDark),
};

export const WizColorPreset = createColorPreset({
  key: 'wiz',
  label: 'Wiz',
  icon: <Wand2Icon />,
  palette: {
    gray,
    blue,
    ...pick(RadixColorPreset.palette, [
      'yellow',
      'amber',
      'orange',
      'red',
      'pink',
      'purple',
      'indigo',
      'green',
      'cyan',
      'teal',
    ]),
  },
});

function generateColorScale(scaleObject: Record<string, string>) {
  return mapKeys(scaleObject, key =>
    // remove the e.g. "yellow" prefix from the key
    key.replaceAll(/\D/g, '')
  );
}
