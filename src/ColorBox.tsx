import { styled } from '@shadow-panda/styled-system/jsx';

export const ColorBox: React.FC<{ color: string }> = ({ color }) => (
  <styled.div
    aspectRatio="square"
    w="10"
    borderRadius="sm"
    style={{ backgroundColor: color }}
  />
);
