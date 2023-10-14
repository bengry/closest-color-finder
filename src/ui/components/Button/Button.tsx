import { Slot } from '@radix-ui/react-slot';
import { styled } from '@shadow-panda/styled-system/jsx';
import { button } from '@shadow-panda/styled-system/recipes';
import * as React from 'react';

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    children?: React.ReactNode;
  }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} {...props} />;
});

export const Button = styled(BaseButton, button);
