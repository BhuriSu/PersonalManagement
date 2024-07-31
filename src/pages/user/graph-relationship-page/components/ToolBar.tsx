import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useToolStore } from '../stores/tool-store';
import { RoughTool } from '../types/type';
import {
  Circle,
  Minus,
  MousePointer,
  Square,
  Diamond,
  MoveUpRight,
  Hand,
  LucideIcon,
  Pencil,
  Type,
} from 'lucide-react';
import styles from './toolBar.module.css'; // Import the CSS module

type Tool = {
  value: RoughTool;
  ariaLabel: string;
  Icon: LucideIcon;
  shortcut?: string;
  disabled?: boolean;
};

const tools: Tool[] = [
  {
    value: 'pan',
    ariaLabel: 'Pan',
    Icon: Hand,
  },
  {
    value: 'select',
    ariaLabel: 'Select object',
    Icon: MousePointer,
    shortcut: '1',
  },
  {
    value: 'line',
    ariaLabel: 'Toggle line',
    Icon: Minus,
    shortcut: '2',
  },
  {
    value: 'arrow',
    ariaLabel: 'Toggle arrow',
    Icon: MoveUpRight,
    shortcut: '3',
  },
  {
    value: 'rect',
    ariaLabel: 'Toggle rect',
    Icon: Square,
    shortcut: '4',
  },
  {
    value: 'diamond',
    ariaLabel: 'Toggle diamond',
    Icon: Diamond,
    shortcut: '5',
  },
  {
    value: 'ellipse',
    ariaLabel: 'Toggle ellipse',
    Icon: Circle,
    shortcut: '6',
  },
  {
    value: 'pencil',
    ariaLabel: 'Toggle pencil',
    Icon: Pencil,
    shortcut: '7',
    disabled: true,
  },
  {
    value: 'text',
    ariaLabel: 'Toggle text',
    Icon: Type,
    shortcut: '8',
    disabled: true,
  },
];

export function ToolBar() {
  const { currTool, setTool } = useToolStore();
  return (
    <div className={styles.toolbarContainer}>
      <ToggleGroup
        size={'sm'}
        type="single"
        variant={'violet'}
        value={currTool}
        onValueChange={(value: RoughTool) => {
          if (value === '') return;
          setTool(value);
        }}
      >
        {tools.map((tool) => (
          <div key={tool.value} className={styles.toggleGroupItemContainer}>
            <ToggleGroupItem
              className={styles.toggleGroupItem}
              value={tool.value}
              aria-label={tool.ariaLabel}
              disabled={tool.disabled}
            >
              <tool.Icon className={styles.icon} />
              {tool.shortcut && (
                <span className={styles.shortcutLabel}>
                  {tool.shortcut}
                </span>
              )}
            </ToggleGroupItem>
          </div>
        ))}
      </ToggleGroup>
    </div>
  );
}
