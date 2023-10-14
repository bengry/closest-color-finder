import 'react';

interface CSSCustomProperties {
  [key: `--${string}`]: string | number;
}

declare module 'react' {
  interface CSSProperties extends Partial<CSSCustomProperties> {}
}
