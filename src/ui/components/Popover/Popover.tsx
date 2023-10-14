import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { createStyleContext } from '@shadow-panda/style-context';
import { cx, css } from '@shadow-panda/styled-system/css';
import { styled } from '@shadow-panda/styled-system/jsx';
import { popover } from '@shadow-panda/styled-system/recipes';
import { fixedForwardRef } from '../utils/fixedForwardRef';

const { withProvider, withContext } = createStyleContext(popover);

const Portal = withContext(styled(PopoverPrimitive.Portal), 'portal');

const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = 'center', sideOffset = 4, ...props }, ref) => (
  <Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
));

const Root = withProvider(styled(PopoverPrimitive.Root), 'root');
const PopoverTrigger = withContext(styled(PopoverPrimitive.Trigger), 'trigger');
const PopoverContent = withContext(styled(Content), 'content');
const PopoverArrow = withContext(
  fixedForwardRef(
    (
      {
        className,
        ...props
      }: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>,
      ref: React.Ref<React.ElementRef<typeof PopoverPrimitive.Arrow>>
    ) => (
      <PopoverPrimitive.Arrow
        ref={ref}
        className={cx(css({ fill: 'border' }), className)}
        {...props}
      />
    )
  )
);

export const Popover = Object.assign(Root, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
});
