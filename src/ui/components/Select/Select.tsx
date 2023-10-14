import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '@shadow-panda/styled-system/jsx';
import { select, icon } from '@shadow-panda/styled-system/recipes';
import { fixedForwardRef } from '../utils';

const { withProvider, withContext } = createStyleContext(select);

const RootPrimitive = withProvider(styled(SelectPrimitive.Root), 'root');
const Root = fixedForwardRef(
  <Value extends string>(
    props: Omit<
      React.ComponentProps<typeof RootPrimitive>,
      'value' | 'onValueChange'
    > & {
      value: Value;
      onValueChange?: (value: Value) => void;
    },
    ref: React.Ref<React.ElementRef<typeof RootPrimitive>>
  ) => {
    return (
      <RootPrimitive
        ref={ref}
        {...(props as React.ComponentProps<typeof RootPrimitive>)}
      />
    );
  }
);

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className={icon({ dimmed: true })} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));

const Viewport = withContext(SelectPrimitive.Viewport, 'viewport');

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      data-position={position}
      {...props}
    >
      <Viewport data-position={position}>{children}</Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

const ItemIndicator = withContext(
  styled(SelectPrimitive.ItemIndicator),
  'itemIndicator'
);

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

const SelectGroup = withContext(styled(SelectPrimitive.Group), 'group');
const SelectValue = withContext(styled(SelectPrimitive.Value), 'value');
const SelectTrigger = withContext(styled(Trigger), 'trigger');
const SelectContent = withContext(styled(Content), 'content');
const SelectLabel = withContext(styled(SelectPrimitive.Label), 'label');
const SelectItem = withContext(styled(Item), 'item');
const SelectSeparator = withContext(
  styled(SelectPrimitive.Separator),
  'separator'
);

export const Select = Object.assign(Root, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
});
