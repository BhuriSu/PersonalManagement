import { memo } from 'react';
import type { NodeStyle } from '../../../shared/types';
import Slider from '../../../components/Elements/Slider/Slider';
import { OPACITY } from '../../../constants/panels';
import * as Styled from './StylePanel.styled';

type Props = {
  value?: NodeStyle['opacity'];
  onValueChange: (opacity: number) => void;
  onValueCommit: (opacity: number) => void;
};

const OpacitySection = ({ value, onValueChange, onValueCommit }: Props) => {
  return (
    <Styled.InnerContainer aria-labelledby="Opacity">
      <Styled.Label>Opacity</Styled.Label>
      <Slider
        value={[value ?? OPACITY.maxValue]}
        min={OPACITY.minValue}
        max={OPACITY.maxValue}
        step={OPACITY.step}
        label="Opacity"
        onValueChange={(values) => onValueChange(values[0])}
        onValueCommit={(values) => onValueCommit(values[0])}
      />
    </Styled.InnerContainer>
  );
};

export default memo(OpacitySection, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});
