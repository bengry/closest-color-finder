import { HStack, VStack, styled } from '@shadow-panda/styled-system/jsx';
import { useLocalStorage } from 'react-use';
import { ClosestColorView } from './ClosestColorView';
import { ColorPresetPicker } from './ColorPresetPicker';
import { ColorPresetView } from './ColorPresetView';
import {
  ColorPresetKey,
  AllColorPresets as allColorPresets,
} from './colorPresets';
import { useState } from 'react';
import { ThemeType } from './colorPresets/_internal/createColorPreset';

export function App() {
  const [selectedPresetKey = allColorPresets[0].key, setSelectedPresetKey] =
    useLocalStorage<ColorPresetKey>('color-preset');

  const [closestColor, setClosestColor] = useState<null | {
    name: string;
    theme: ThemeType;
    scaleKey: string;
  }>(null);

  const selectedPalette = allColorPresets.find(
    preset => preset.key === selectedPresetKey
  )?.palette;

  return (
    <VStack my="5" mx="10" alignItems="start">
      <styled.h1 fontWeight="medium" fontSize="xl">
        Closest Color Finder
      </styled.h1>

      <HStack w="full" justifyContent="space-between">
        <ClosestColorView
          colorPalette={selectedPalette}
          onClosestColorChange={change =>
            setClosestColor(change?.closestColor ?? null)
          }
        />

        <ColorPresetPicker
          value={selectedPresetKey}
          onValueChange={setSelectedPresetKey}
          options={allColorPresets}
        />
      </HStack>

      {selectedPalette && (
        <ColorPresetView palette={selectedPalette} highlight={closestColor} />
      )}
    </VStack>
  );
}
