import { Box, HStack, styled } from '@shadow-panda/styled-system/jsx';
import { CheckCircleIcon } from 'lucide-react';
import parseColor, { Color } from 'parse-color';
import { useState } from 'react';
import { objectEntries } from 'typedash';
import { Label, Popover, useToast } from './ui/components';
import { copyToClipboard } from './utils';

export const ColorActions: React.FC<
  React.PropsWithChildren<{
    title?: React.ReactNode;
    value: string;
  }>
> = ({ title, value, children }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toast = useToast();

  const color = parseColor(value);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Popover.Trigger cursor="pointer" w="fit">
        {children}
      </Popover.Trigger>

      <Popover.Content p="2">
        <Popover.Arrow />

        {title && <Box mx="1">{title}</Box>}

        <ul role="menu">
          {objectEntries(COLOR_FORMATS_UI).map(
            ([format, { label, formatToString }]) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const stringifiedValue = formatToString(color[format] as any);

              return (
                <styled.li
                  key={format}
                  role="menuitem"
                  rounded="sm"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px="2"
                  py="1"
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                  onClick={() => {
                    copyToClipboard(stringifiedValue);
                    toast.show({
                      title: (
                        <HStack gap="1" color="green.700">
                          <CheckCircleIcon />
                          Copied to clipboard
                        </HStack>
                      ),
                      bg: 'green.50',
                    });
                    setPopoverOpen(false);
                  }}
                >
                  <Label>{label}</Label>
                  <styled.span color="gray.500">{stringifiedValue}</styled.span>
                </styled.li>
              );
            }
          )}
        </ul>
      </Popover.Content>
    </Popover>
  );
};

const COLOR_FORMATS_UI = {
  hex: {
    label: 'Hex',
    formatToString: value => value,
  },
  rgba: {
    label: 'RGBA',
    formatToString: ([r, g, b, a]) => {
      const rgbString = `${r}, ${g}, ${b}`;
      if (a === 1) return `rgb(${rgbString})`;

      const alphaPercentage = Math.round(a * 100) / 100;
      return `rgba(${rgbString} / ${alphaPercentage})`;
    },
  },
  hsla: {
    label: 'HSL',
    formatToString: ([h, s, l, a]) => {
      const hslString = `${h}, ${s}%, ${l}%`;
      if (a === 1) return `hsl(${hslString})`;

      const alphaPercentage = Math.round(a * 100) / 100;
      return `hsla(${h}, ${s}%, ${l}%, ${alphaPercentage})`;
    },
  },
} satisfies {
  [Format in keyof Color]?: {
    label: string;
    formatToString(value: NonNullable<Color[Format]>): string;
  };
};
