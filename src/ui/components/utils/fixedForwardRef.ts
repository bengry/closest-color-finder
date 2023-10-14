import * as React from 'react';

// Declare a type that works with generic components
// eslint-disable-next-line @typescript-eslint/ban-types
type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement
) => (props: P & React.RefAttributes<T>) => React.ReactElement;

/**
 * Like `React.forwardRef`, but works with generic components.
 *
 * Note that you do use `displayName` with this function, but it's worth it
 */
export const fixedForwardRef = React.forwardRef as FixedForwardRef;
