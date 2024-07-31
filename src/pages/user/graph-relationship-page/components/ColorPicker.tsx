
import { RgbaStringColorPicker } from 'react-colorful';
import './colorPicker.css';

interface ColorPickerProps {
  colorStr: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ colorStr, onChange }: ColorPickerProps) {
  return (
    <div className="color-picker-container">
      <RgbaStringColorPicker color={colorStr} onChange={onChange} />
    </div>
  );
}