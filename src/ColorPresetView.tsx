import { HStack } from '@shadow-panda/styled-system/jsx';
import { Maybe, capitalize, objectEntries, pick } from 'typedash';
import { ColorBlock } from './ColorBlock';
import {
  ColorPalette,
  ThemeType,
} from './colorPresets/_internal/createColorPreset';

export const ColorPresetView: React.FC<{
  palette: ColorPalette;
  highlight?: Maybe<{
    name: string;
    theme: ThemeType;
    scaleKey: string;
  }>;
}> = ({ palette, highlight }) => {
  return (
    <HStack rowGap="6" columnGap="14" marginTop="10" flexWrap="wrap">
      {objectEntries(palette).map(([colorName, colorScale]) => (
        <ColorBlock
          key={colorName}
          colorName={capitalize(colorName)}
          colorScale={colorScale}
          highlight={
            colorName === highlight?.name
              ? pick(highlight, ['theme', 'scaleKey'])
              : null
          }
        />
      ))}
    </HStack>
  );
};
