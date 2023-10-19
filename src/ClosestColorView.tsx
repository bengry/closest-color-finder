import { css } from '@shadow-panda/styled-system/css';
import {
  Circle,
  HStack,
  VStack,
  styled,
  Box,
} from '@shadow-panda/styled-system/jsx';
import { XIcon } from 'lucide-react';
import createNearestColor from 'nearest-color';
import parseColor from 'parse-color';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce, useLatest } from 'react-use';
import {
  Maybe,
  capitalize,
  ensurePrefix,
  isEmpty,
  objectEntries,
  objectFromEntries,
  pick,
  sample,
} from 'typedash';

import {
  ColorPalette,
  ThemeType,
} from './colorPresets/_internal/createColorPreset';
import { Button, Input, Label } from './ui/components';
import { THEME_TYPE_UI } from './ThemeTypeUI';
import { ColorActions } from './ColorActions';

export const ClosestColorView: React.FC<{
  className?: string;
  colorPalette: Maybe<ColorPalette>;
  onClosestColorChange?: (
    options: null | {
      inputColor: string;
      closestColor: {
        name: string;
        theme: ThemeType;
        scaleKey: string;
      };
    }
  ) => void;
}> = ({ className, colorPalette, ...props }) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebouncedState(input, 500);

  const getNearestColor = useMemo(() => {
    if (colorPalette == null) return null;

    const flattenedColorPalette = objectFromEntries(
      objectEntries(colorPalette).flatMap(([colorName, scale]) => {
        return objectEntries(scale).flatMap(([themeType, themeColors]) =>
          objectEntries(themeColors ?? {}).map(
            ([scaleKey, colorValue]) =>
              [
                [colorName, themeType, scaleKey].join(':'),
                parseColor(colorValue).hex,
              ] as const
          )
        );
      })
    );

    return createNearestColor.from(flattenedColorPalette);
  }, [colorPalette]);

  const parsedColorHex = tryGetOrDefault(() => {
    const isInputHexLike =
      input.startsWith('#') || input.length === 6 || input.length === 3;

    if (isInputHexLike) {
      return parseColor(ensurePrefix(input, '#')).hex;
    }

    return parseColor(input).hex;
  }, null);

  const nearestColor = useMemo(() => {
    const colorMatch = parsedColorHex
      ? getNearestColor?.(parsedColorHex)
      : null;

    if (colorMatch == null) return null;

    return {
      ...paletteColorSerializer.deserialize(colorMatch?.name),
      value: colorMatch.value,
      distance: colorMatch.distance,
    };
  }, [getNearestColor, parsedColorHex]);

  const onClosestColorChange = useLatest(props.onClosestColorChange);
  useEffect(() => {
    if (onClosestColorChange.current == null) return;

    if (nearestColor == null) {
      onClosestColorChange.current(null);
      return;
    }

    onClosestColorChange.current({
      inputColor: debouncedInput,
      closestColor: pick(nearestColor, ['name', 'theme', 'scaleKey']),
    });
  }, [debouncedInput, nearestColor, onClosestColorChange]);

  const examples = [
    '#abcdef',
    'rgba(124, 218, 33, 0.7)',
    'hsla(120, 100%, 50%, 0.3)',
    'hsl(120, 100%, 50%)',
    'rgb(124, 218, 33)',
    'green',
  ];

  return (
    <HStack gap="2" className={className} minH="45px">
      <Label>Color</Label>
      <Box display="grid" gridTemplateColumns="auto 1fr" alignItems="center">
        <Input
          gridColumn="full"
          gridRow="full"
          placeholder={sample(examples)}
          value={input}
          onChange={e => setInput(e.target.value)}
          w="56"
          transitionDelay="slower"
          aria-invalid={!isEmpty(debouncedInput) && parsedColorHex == null}
          pl="8"
        />
        <Circle
          gridColumnStart={1}
          gridColumnEnd={2}
          ml="4"
          translateX="-50%"
          outline="1px solid"
          outlineColor="gray.200"
          gridRow="full"
          aspectRatio="square"
          h="1rem"
          style={{
            backgroundColor: parsedColorHex ?? undefined,
          }}
        />
      </Box>

      <Button variant="outline" size="icon" onClick={() => setInput('')}>
        <XIcon className={css({ w: 4, aspectRatio: 'square' })} />
      </Button>

      {nearestColor && (
        <VStack alignItems="start" ml="2" gap="0">
          <ColorActions value={nearestColor.value}>
            <ColorMatch
              theme={nearestColor.theme}
              name={nearestColor.name}
              scaleKey={nearestColor.scaleKey}
              colorHex={nearestColor.value}
            />
          </ColorActions>
          <styled.span fontSize="sm" color="gray.500">
            Distance: {Math.floor(nearestColor.distance)}
          </styled.span>
        </VStack>
      )}
    </HStack>
  );
};

const ColorMatch: React.FC<{
  name: string;
  theme: ThemeType;
  scaleKey: string;
  colorHex: string;
  className?: string;
}> = ({ name, theme, scaleKey, colorHex, className }) => {
  return (
    <HStack gap="1" alignItems="center" className={className}>
      <Circle
        style={{ backgroundColor: colorHex }}
        w="4"
        outline="1px solid"
        outlineColor="gray.200"
        aspectRatio="square"
      />
      <styled.span>
        {capitalize(name)} {scaleKey}
      </styled.span>

      <styled.span color="gray.500" fontSize="sm">
        ({THEME_TYPE_UI[theme].label})
      </styled.span>
    </HStack>
  );
};

function useDebouncedState<T>(value: T, delay: number) {
  const [state, setState] = useState(value);
  useDebounce(() => setState(value), delay, [value]);
  return state;
}

function tryGetOrDefault<T>(valueGetter: () => T, defaultValue: T) {
  try {
    return valueGetter();
  } catch {
    return defaultValue;
  }
}

const paletteColorSerializer = {
  serialize: ({
    name,
    theme,
    scaleKey,
  }: {
    name: string;
    theme: ThemeType;
    scaleKey: string;
  }) => [name, theme, scaleKey].join(':'),
  deserialize: (serialized: string) => {
    const [name, theme, scaleKey] = serialized.split(':') as [
      string,
      ThemeType,
      string,
    ];

    return { name, theme, scaleKey };
  },
};
