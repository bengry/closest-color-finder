import { VStack, HStack, styled } from '@shadow-panda/styled-system/jsx';
import { useLocalStorage } from 'react-use';
import { capitalize, keyBy, objectEntries, objectKeys } from 'typedash';
import { ColorBlock } from './ColorBlock';
import { RadixColorPreset } from './colorPresets/RadixColorPreset';
import { Select } from './ui/components';

const presets = keyBy([RadixColorPreset], preset => preset.key);

type PresetKey = keyof typeof presets;

export function App() {
  const [selectedPresetKey = objectKeys(presets)[0], setSelectedPresetKey] =
    useLocalStorage<PresetKey>('color-preset');

  const selectedPalette = presets[selectedPresetKey]?.palette;

  return (
    <VStack my="5" mx="10" alignItems="start">
      <styled.h1 fontWeight={'medium'} fontSize={'xl'}>
        Closest Color Finder
      </styled.h1>

      <Select value={selectedPresetKey} onValueChange={setSelectedPresetKey}>
        <Select.Trigger w="180px">
          <Select.Value placeholder="Select a preset" />
        </Select.Trigger>

        <Select.Content>
          <Select.Item value="radix">Radix</Select.Item>
          <Select.Item value="wiz">Wiz</Select.Item>
        </Select.Content>
      </Select>

      <HStack
        rowGap="6"
        columnGap="14"
        marginTop="10"
        flexWrap="wrap"
        _empty={{ display: 'none' }}
      >
        {objectEntries(selectedPalette ?? {}).map(([colorName, colorScale]) => (
          <ColorBlock
            key={colorName}
            colorName={capitalize(colorName)}
            colorScale={colorScale}
          />
        ))}
      </HStack>
    </VStack>
  );
}
