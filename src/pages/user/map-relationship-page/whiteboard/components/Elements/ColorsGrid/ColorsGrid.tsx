import { createTitle } from '../../../utils/string';
import ColorCircle from '../ColorCircle/ColorCircle';
import RadioGroup from '../RadioGroup/RadioGroup';
import { GRID_COLORS } from '../../../constants/panels';
import * as PanelStyled from '../../../components/Panels/StylePanel/StylePanel.styled';
import * as Styled from './ColorsGrid.styled';

type Props = {
  value: string;
  withLabel?: boolean;
  onSelect: (color: (typeof GRID_COLORS)[number]['value']) => void;
};

const ColorsGrid = ({ withLabel = false, value, onSelect }: Props) => {
  return (
    <RadioGroup
      defaultValue={value}
      aria-label="Colors"
      aria-labelledby="colors"
      orientation="horizontal"
      value={value}
      onValueChange={onSelect}
      data-testid="colors-grid"
    >
      {withLabel && <PanelStyled.Label>Color</PanelStyled.Label>}
      <Styled.Grid>
        {GRID_COLORS.map((color) => {
          const colorValue = String(color.value); // Ensure value is a string
          return (
            <Styled.Color
              key={colorValue} // Ensure key is a string
              checked={colorValue === value}
              value={colorValue}
              aria-label={`${color.name} color`}
              title={createTitle('Color', color.name)}
              color={
                colorValue === value ? 'secondary-dark' : 'secondary-light'
              }
              style={{ color: `var(--colors-${colorValue})` }}
              data-testid={`${colorValue}-color-button`}
            >
              <ColorCircle />
            </Styled.Color>
          );
        })}
      </Styled.Grid>
    </RadioGroup>
  );
};

export default ColorsGrid;
