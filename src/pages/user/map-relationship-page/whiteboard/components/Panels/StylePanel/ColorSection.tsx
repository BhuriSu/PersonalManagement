import { memo } from 'react';
import type { NodeColor } from '../../../shared/types';
import { colors } from '../../../shared/design/theme';
import ColorsGrid from '../../../components/Elements/ColorsGrid/ColorsGrid';
import * as Styled from './StylePanel.styled';

type Props = {
  value?: NodeColor;
  onColorChange: (color: NodeColor) => void;
};

const ColorSection = ({ value, onColorChange }: Props) => {
  const stringValue = value ? String(value) : undefined;

  return (
    <Styled.InnerContainer
      aria-label="Color"
      aria-labelledby="shape-color"
      orientation="horizontal"
      value={stringValue}
      onValueChange={onColorChange}
    >
      <Styled.Label>Color</Styled.Label>
      <ColorsGrid value={stringValue || colors.black} onSelect={onColorChange} />
    </Styled.InnerContainer>
  );
};

export default memo(ColorSection, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});
