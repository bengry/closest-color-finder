import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '@shadow-panda/styled-system/jsx';
import { cx } from '@shadow-panda/styled-system/css';
import {
  toast,
  toastViewport,
  icon,
} from '@shadow-panda/styled-system/recipes';
import { fixedForwardRef } from '..';

const { withProvider, withContext } = createStyleContext(toast);

const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = fixedForwardRef(
  (
    props: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>,
    ref: React.Ref<React.ElementRef<typeof ToastPrimitive.Viewport>>
  ) => {
    return (
      <ToastPrimitive.Viewport
        ref={ref}
        className={cx(toastViewport(props), props.className)}
      />
    );
  }
);
const Root = withProvider(styled(ToastPrimitive.Root), 'root', {
  className: 'group',
});
export const ToastAction = withContext(styled(ToastPrimitive.Action), 'action');
export const ToastClose = withContext(styled(ToastPrimitive.Close), 'close', {
  children: <X className={icon()} />,
});
export const ToastTitle = withContext(styled(ToastPrimitive.Title), 'title');
export const ToastDescription = withContext(
  styled(ToastPrimitive.Description),
  'description'
);

export type ToastProps = React.ComponentPropsWithoutRef<typeof Root>;
export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export const Toast = Object.assign(Root, {
  Provider: ToastProvider,
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
  Viewport: ToastViewport,
});
