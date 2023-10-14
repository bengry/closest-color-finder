import { HStack, Box } from '@shadow-panda/styled-system/jsx';
import { capitalize } from 'typedash';
import { ColorPresetConfig } from './colorPresets/_internal/createColorPreset';
import { Label, Select } from './ui/components';

export function ColorPresetPicker<T extends string>({
  value,
  onValueChange,
  options,
  className,
}: {
  options: readonly ColorPresetConfig<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
}) {
  return (
    <HStack className={className}>
      <Label ml="auto">Color Preset</Label>
      <Select value={value} onValueChange={onValueChange}>
        <Select.Trigger w="180px">
          <Select.Value placeholder="Select a preset" />
        </Select.Trigger>

        <Select.Content>
          {options.map(option => (
            <Select.Item key={option.key} value={option.key}>
              <HStack gap="1">
                <Box css={{ '& > svg': { w: '1rem' } }}>{option.icon}</Box>
                {option.label ?? capitalize(option.key)}
              </HStack>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </HStack>
  );
}
