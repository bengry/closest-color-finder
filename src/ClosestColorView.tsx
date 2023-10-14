import { css } from '@shadow-panda/styled-system/css';
import { HStack } from '@shadow-panda/styled-system/jsx';
import { useState } from 'react';
import { Button, Input, Label } from './ui/components';
import { XIcon } from 'lucide-react';

export const ClosestColorView: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [color, setColor] = useState('');

  return (
    <HStack gap="2" className={className}>
      <Label>Color</Label>
      <Input
        placeholder="Enter color"
        w="52"
        value={color}
        onChange={e => setColor(e.target.value)}
      />
      <Button variant="outline" size="icon" onClick={() => setColor('')}>
        <XIcon className={css({ w: 4, aspectRatio: 'square' })} />
      </Button>
    </HStack>
  );
};
