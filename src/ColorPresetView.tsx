import { HStack } from '@shadow-panda/styled-system/jsx';
import { capitalize, objectEntries } from 'typedash';
import { ColorBlock } from './ColorBlock';
import { ColorPalette } from './colorPresets/_internal/createColorPreset';

export const ColorPresetView: React.FC<{
  palette: ColorPalette;
}> = ({ palette }) => {
  return (
    <HStack rowGap="6" columnGap="14" marginTop="10" flexWrap="wrap">
      {objectEntries(palette).map(([colorName, colorScale]) => (
        <ColorBlock
          key={colorName}
          colorName={capitalize(colorName)}
          colorScale={colorScale}
        />
      ))}
    </HStack>
  );
};
