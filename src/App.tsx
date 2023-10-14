import { HStack, VStack, styled } from '@shadow-panda/styled-system/jsx';
import { useLocalStorage } from 'react-use';
import { keyBy, objectKeys } from 'typedash';
import { ClosestColorView } from './ClosestColorView';
import { ColorPresetPicker } from './ColorPresetPicker';
import { ColorPresetView } from './ColorPresetView';
import { RadixColorPreset } from './colorPresets/RadixColorPreset';
import { WizColorPreset } from './colorPresets/WizColorPreset';

const presets = keyBy([RadixColorPreset, WizColorPreset], preset => preset.key);

type PresetKey = keyof typeof presets;

export function App() {
  const [selectedPresetKey = objectKeys(presets)[0], setSelectedPresetKey] =
    useLocalStorage<PresetKey>('color-preset');

  const selectedPalette = presets[selectedPresetKey]?.palette;

  return (
    <VStack my="5" mx="10" alignItems="start">
      <styled.h1 fontWeight="medium" fontSize="xl">
        Closest Color Finder
      </styled.h1>

      <HStack w="full" justifyContent="space-between">
        <ClosestColorView colorPalette={selectedPalette} />

        <ColorPresetPicker
          value={selectedPresetKey}
          onValueChange={setSelectedPresetKey}
        />
      </HStack>

      {selectedPalette && <ColorPresetView palette={selectedPalette} />}
    </VStack>
  );
}
