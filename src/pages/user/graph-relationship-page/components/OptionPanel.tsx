import React from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useOptionStore } from '../stores/option-store';
import { RoughTool } from '../types/type';
import { Separator } from './ui/separator';
import ColorPickerButton from './ColorPickerButton';
import Checkboard from './Checkboard';
import { useColorPickerStore } from '../stores/colorpicker-store';
import ColorPicker from './ColorPicker';
import './optionPanel.css';

type Opt = {
  value: string;
  ariaLabel: string;
  html: React.ReactNode;
  className?: string;
};

type Options = {
  title: string;
  name: string;
  values: Opt[];
};

type OptionProps = {
  currValue: string;
  setValue: (key: string, value: string) => void;
} & Options;

function Option({ name, title, values, setValue, currValue }: OptionProps) {
  return (
    <div>
      <p className="option-title">{title}</p>
      <ToggleGroup
        type="single"
        size={'ssm'}
        variant={'violet'}
        value={currValue}
        onValueChange={(value: string) => {
          if (value === '') return;
          setValue(name, value);
        }}
      >
        {values.map((opt) => (
          <ToggleGroupItem
            key={opt.value}
            className={opt.className}
            value={opt.value}
            aria-label={opt.ariaLabel}
          >
            {opt.html}
          </ToggleGroupItem>
        ))}
        {(name === 'stroke' || name === 'fill') && (
          <>
            <Separator className="bg-gray-400 h-4" orientation="vertical" />
            <ColorPickerButton currValue={currValue} for={name} />
          </>
        )}
      </ToggleGroup>
    </div>
  );
}

const options: Options[] = [
  {
    title: 'Stroke',
    name: 'stroke',
    values: [
      {
        value: 'rgba(0,0,0,0.8)',
        ariaLabel: 'Select black stroke',
        html: <div className="color-div" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />,
      },
      {
        value: 'rgba(249,115,22,0.8)',
        ariaLabel: 'Select orange stroke',
        html: <div className="color-div" style={{ backgroundColor: 'rgba(249,115,22,0.8)' }} />,
      },
      {
        value: 'rgba(59,130,246,0.8)',
        ariaLabel: 'Select blue stroke',
        html: <div className="color-div" style={{ backgroundColor: 'rgba(59,130,246,0.8)' }} />,
      },
    ],
  },
  {
    title: 'Background',
    name: 'fill',
    values: [
      {
        value: 'none',
        ariaLabel: 'Select no background',
        html: <Checkboard className="checkboard" />,
      },
      {
        value: 'rgba(236,72,153,0.7)',
        ariaLabel: 'Toggle teal color',
        html: <div className="color-div" style={{ backgroundColor: 'rgba(236,72,153,0.7)' }} />,
      },
      {
        value: 'rgba(20,184,166,0.7)',
        ariaLabel: 'Toggle fuchsia color',
        html: <div className="color-div" style={{ backgroundColor: 'rgba(20,184,166,0.7)' }} />,
      },
    ],
  },
  // Other options omitted for brevity
];

export default function OptionPanel({
  height: windowH,
  currTool,
  hidden,
}: {
  currTool: RoughTool;
  height: number;
  hidden: boolean;
}) {
  const { options: selectedOpt, setKeyValue } = useOptionStore();
  const activeOptions = options
    .filter((opt) => opt.name !== 'fillStyle' || selectedOpt.fill !== 'none')
    .filter(
      (opt) =>
        (currTool !== 'arrow' && currTool !== 'line') ||
        (opt.name !== 'fill' && opt.name !== 'fillStyle')
    );
  const { active, name: optName, setActive } = useColorPickerStore();

  // if panel hidden, close color picker and set active to false
  if (active && hidden) setActive(false);
  return (
    <>
      <aside
        className={`option-panel ${windowH < 600 ? 'h54' : ''} ${selectedOpt.fill !== 'none' ? 'max-h-384' : 'max-h-324'} ${
          hidden ? 'hidden' : ''
        }`}
      >
        {/* Sidebar content goes here */}
        <div className="option-panel-content">
          {activeOptions.map((option) => (
            <Option
              key={option.name}
              {...option}
              setValue={(key: string, value: string) => {
                if (active) setActive(false);
                setKeyValue(key, value);
              }}
              currValue={(selectedOpt as any)[option.name]}
            />
          ))}
        </div>
      </aside>
      {active && !hidden && (
        <ColorPicker
          colorStr={(selectedOpt as any)[optName]}
          onChange={(col: string) => {
            setKeyValue(optName, col);
          }}
        />
      )}
    </>
  );
}
