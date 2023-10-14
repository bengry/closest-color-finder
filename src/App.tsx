import { HStack, VStack, styled } from '@shadow-panda/styled-system/jsx';
import { useLocalStorage } from 'react-use';
import { ClosestColorView } from './ClosestColorView';
import { ColorPresetPicker } from './ColorPresetPicker';
import { ColorPresetView } from './ColorPresetView';
import {
  ColorPresetKey,
  AllColorPresets as allColorPresets,
} from './colorPresets';

export function App() {
  const [selectedPresetKey = allColorPresets[0].key, setSelectedPresetKey] =
    useLocalStorage<ColorPresetKey>('color-preset');

  const selectedPalette = allColorPresets.find(
    preset => preset.key === selectedPresetKey
  )?.palette;

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
          options={allColorPresets}
        />
      </HStack>

      {selectedPalette && <ColorPresetView palette={selectedPalette} />}
    </VStack>
  );
}
