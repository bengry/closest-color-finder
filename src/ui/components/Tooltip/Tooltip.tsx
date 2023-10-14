import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { createStyleContext } from '@shadow-panda/style-context';
import { styled } from '@shadow-panda/styled-system/jsx';
import { tooltip } from '@shadow-panda/styled-system/recipes';

const { withProvider, withContext } = createStyleContext(tooltip);

export const TooltipProvider = TooltipPrimitive.Provider;
export const Root = withProvider(styled(TooltipPrimitive.Root), 'root');
export const TooltipTrigger = withContext(
  styled(TooltipPrimitive.Trigger),
  'trigger'
);
export const TooltipContent = withContext(
  styled(TooltipPrimitive.Content),
  'content',
  {
    sideOffset: 4,
  }
);

export const Tooltip = Object.assign(Root, {
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});
