import { RadixColorPreset } from './RadixColorPreset';
import { TailwindColorPreset } from './TailwindColorPreset';
import { WizColorPreset } from './WizColorPreset';

export const AllColorPresets = [
  RadixColorPreset,
  WizColorPreset,
  TailwindColorPreset,
];

export type ColorPresetKey = (typeof AllColorPresets)[number]['key'];
