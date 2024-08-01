import { styled } from '../../../shared/src/design/theme';
import { Stage as KonvaStage } from 'react-konva';

export const Stage = styled(KonvaStage, {
  touchAction: 'none',
});
