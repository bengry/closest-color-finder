import { HStack } from '@shadow-panda/styled-system/jsx';
import { Label, Select } from './ui/components';

export function ColorPresetPicker<T extends string>({
  value,
  onValueChange,
  ...props
}: {
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
}) {
  return (
    <HStack {...props}>
      <Label ml="auto">Color Preset</Label>
      <Select value={value} onValueChange={onValueChange}>
        <Select.Trigger w="180px">
          <Select.Value placeholder="Select a preset" />
        </Select.Trigger>

        <Select.Content>
          <Select.Item value="radix">Radix</Select.Item>
          <Select.Item value="wiz">Wiz</Select.Item>
        </Select.Content>
      </Select>
    </HStack>
  );
}
