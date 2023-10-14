declare module 'nearest-color' {
  export interface RGB {
    r: number;
    g: number;
    b: number;
  }

  export interface ColorSpec {
    name?: string;
    source: string;
    rgb: RGB;
  }

  export interface ColorMatch {
    name: string;
    value: string;
    rgb: RGB;
    distance: number;
  }

  type NeedleColor = RGB | string;
  type AvailableColors = string[] | { [colorName: string]: string };

  function nearestColor(
    needle: NeedleColor,
    colors?: ColorSpec[]
  ): ColorMatch | null;

  export function from(availableColors: AvailableColors): typeof nearestColor;

  const STANDARD_COLORS: { [colorName: string]: string };
  const DEFAULT_COLORS: ColorSpec[];
  const VERSION: string;
}
