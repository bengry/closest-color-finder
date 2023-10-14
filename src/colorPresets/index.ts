import { RadixColorPreset } from './RadixColorPreset';
import { WizColorPreset } from './WizColorPreset';

export const AllColorPresets = [RadixColorPreset, WizColorPreset];

export type ColorPresetKey = (typeof AllColorPresets)[number]['key'];
