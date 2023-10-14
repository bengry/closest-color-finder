import { Grid, VStack, styled } from '@shadow-panda/styled-system/jsx';
import React from 'react';
import { objectEntries } from 'typedash';
import { ColorActions } from './ColorActions';
import { ColorScale } from './colorPresets/_internal/createColorPreset';
import { ColorBox } from './ColorBox';
import { THEME_TYPE_UI } from './THEME_TYPE_UI';

export const ColorBlock: React.FC<{
  colorName: string;
  colorScale: ColorScale;
}> = ({ colorName, colorScale }) => {
  return (
    <VStack
      gap="1"
      alignItems="start"
      style={{
        '--color-count': Object.keys(colorScale.light).length,
      }}
    >
      <styled.span fontWeight="medium">{colorName}</styled.span>

      <Grid
        rowGap="2"
        columnGap="1"
        gridTemplateColumns="repeat(calc(var(--color-count) + 1), 1fr)"
        gridTemplateRows={2}
        alignItems="center"
        p="2"
        rounded="sm"
      >
        {objectEntries(THEME_TYPE_UI).map(([themeType, { label }]) => {
          const colors = colorScale[themeType];
          return (
            <React.Fragment key={themeType}>
              <styled.span color="gray.500" mr="3">
                {label}
              </styled.span>

              {objectEntries(colors).map(([key, value]) => {
                return (
                  <ColorActions key={key} value={value}>
                    <ColorBox color={value} />
                  </ColorActions>
                );
              })}
            </React.Fragment>
          );
        })}
      </Grid>
    </VStack>
  );
};
