import { styled } from '../../../shared/design/theme';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export const Content = styled(PopoverPrimitive.Content, {
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '$sm',
  borderRadius: '$2',
  backgroundColor: '$bg',
});
