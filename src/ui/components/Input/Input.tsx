import { cx, css } from '@shadow-panda/styled-system/css';
import { styled } from '@shadow-panda/styled-system/jsx';
import { input } from '@shadow-panda/styled-system/recipes';
import { fixedForwardRef } from '../utils/fixedForwardRef';

export const Input = styled(
  fixedForwardRef(
    (
      { className, ...props }: React.ComponentPropsWithoutRef<'input'>,
      ref: React.Ref<React.ElementRef<'input'>>
    ) => {
      return (
        <input
          ref={ref}
          className={cx(
            input(props),
            css({
              _focus: {
                transition: 'all',
              },
              '&[aria-invalid="true"]': {
                outline: '2px solid transparent',
                outlineOffset: '2px',
                focusRingWidth: '2',
                focusRingColor: 'red.500',
                focusRingOffsetWidth: '2',
              },
            }),
            className
          )}
          {...props}
        />
      );
    }
  )
);
