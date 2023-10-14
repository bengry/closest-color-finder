import { Box, Grid, VStack, styled } from '@shadow-panda/styled-system/jsx';
import React from 'react';
import { Maybe, objectEntries } from 'typedash';
import { ColorActions } from './ColorActions';
import {
  ColorScale,
  ThemeType,
} from './colorPresets/_internal/createColorPreset';
import { ColorBox } from './ColorBox';
import { THEME_TYPE_UI } from './THEME_TYPE_UI';
import { Tooltip } from './ui/components';

export const ColorBlock: React.FC<{
  colorName: string;
  colorScale: ColorScale;
  highlight?: Maybe<{
    theme: ThemeType;
    scaleKey: string;
  }>;
}> = ({ colorName, colorScale, highlight }) => {
  return (
    <VStack
      gap="1"
      alignItems="start"
      style={{
        '--color-count': Object.keys(colorScale.light ?? colorScale.dark ?? {})
          .length,
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
        {objectEntries(THEME_TYPE_UI).map(
          ([themeType, { label: themeLabel }]) => {
            const colors = colorScale[themeType];
            if (!colors) return null;

            return (
              <React.Fragment key={themeType}>
                <styled.span color="gray.500" mr="3">
                  {themeLabel}
                </styled.span>

                {objectEntries(colors).map(([key, value]) => {
                  const isHighlighted =
                    highlight?.theme === themeType &&
                    highlight.scaleKey === key;

                  const colorTitle = (
                    <>
                      <styled.span fontWeight="medium">
                        {colorName} {key}
                      </styled.span>
                      &nbsp;
                      <styled.span color="gray.500" fontSize="sm">
                        ({themeLabel})
                      </styled.span>
                    </>
                  );

                  return (
                    <ColorActions key={key} value={value} title={colorTitle}>
                      <Box
                        ref={ref => {
                          if (isHighlighted) {
                            ref?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'nearest',
                            });
                          }
                        }}
                        css={{
                          transition: 'all',
                          transitionDuration: 'fast',
                          outlineWidth: 'medium',
                          outlineColor: 'transparent',
                          outlineOffset: '2px',
                          outlineStyle: 'dotted',
                          ...(isHighlighted && {
                            outlineColor: 'yellow.400',
                          }),
                        }}
                      >
                        <Tooltip delayDuration={500}>
                          <Tooltip.Trigger asChild>
                            <span role="button">
                              <ColorBox color={value} />
                            </span>
                          </Tooltip.Trigger>

                          <Tooltip.Content>{colorTitle}</Tooltip.Content>
                        </Tooltip>
                      </Box>
                    </ColorActions>
                  );
                })}
              </React.Fragment>
            );
          }
        )}
      </Grid>
    </VStack>
  );
};
