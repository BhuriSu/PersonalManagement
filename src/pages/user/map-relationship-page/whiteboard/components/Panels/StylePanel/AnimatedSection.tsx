import { memo } from 'react';
import Toggle from '../../../components/Elements/Toggle/Toggle';
import { ANIMATED } from '../../../constants/panels';
import { createTitle } from '../../../utils/string';
import * as Styled from './StylePanel.styled';
import type { NodeStyle } from '../../../shared/types';

type Props = {
  value: NodeStyle['animated'];
  isDisabled: boolean;
  onAnimatedChange: (animated: NodeStyle['animated']) => void;
};

const AnimatedSection = ({ value, isDisabled, onAnimatedChange }: Props) => {
  const valueTitle = value ? 'On' : 'Off';

  return (
    <Styled.InnerContainer aria-labelledby="shape-animated">
      <Styled.Label>{ANIMATED.name}</Styled.Label>
      <Toggle
        aria-label="Toggle Animated"
        title={createTitle(ANIMATED.name, valueTitle)}
        pressed={value}
        color={value ? 'primary' : 'secondary-light'}
        size="xs"
        disabled={isDisabled}
        onPressedChange={onAnimatedChange}
        squared
        data-testid="animated-toggle"
      >
        {valueTitle}
      </Toggle>
    </Styled.InnerContainer>
  );
};

export default memo(AnimatedSection, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.isDisabled === nextProps.isDisabled
  );
});
