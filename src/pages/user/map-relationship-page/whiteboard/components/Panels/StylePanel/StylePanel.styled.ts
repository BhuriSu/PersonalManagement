import { styled } from '../../../shared/design/theme';
import { Button } from '../../../components/Elements/Button/Button.styled';
import RadioGroup from '../../../components/Elements/RadioGroup/RadioGroup';
import * as PanelStyled from '../Panels.styled';

export const Container = styled(PanelStyled.Panel, {
  position: 'absolute',
  top: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  padding: '$2',
  marginTop: '$2',
});

export const InnerContainer = styled(RadioGroup, {
  display: 'flex',
  flexDirection: 'column',
});

export const Grid = styled('div', {
  display: 'grid',
  placeItems: 'center',
  gridTemplateColumns: '$5 $5 $5 $5',
  gap: '$1',
});

export const Label = styled('span', {
  fontSize: '$1',
  display: 'inline-block',
  paddingBottom: '$1',
  color: '$black',
  opacity: 0.7,
});

export const Item = styled(RadioGroup.Item, Button, {
  defaultVariants: {
    squared: true,
    size: 'xs',
  },
});

export const ArrowHeadsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const ArrowHeadsTriggers = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
});

export const ArrowHeadsPopoverContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
  padding: '$1',
});
