import { FC, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../hooks/UseWindowSize';
import { getClickPayload } from '../lib/rough-utils';
import { RoughElement } from '../models/RoughElement';
import { RoughFactor } from '../models/RoughFactor';
import { useToolStore } from '../stores/tool-store';
import { Anchor, CanvasState, ClickPayload, Point } from '../types/type';
import { useOptionStore } from '../stores/option-store';
import rough from 'roughjs';
import OptionPanel from './OptionPanel';
import styles from './roughCanvas.module.css'; // Import the CSS module
import { Drawable } from 'roughjs/bin/core';

const cursorFromAnchor = (anchor: Anchor): string => {
  if (anchor === 'inside') return 'move';
  if (anchor === 'tl' || anchor === 'br') return 'nwse-resize';
  if (anchor === 'tr' || anchor === 'bl') return 'nesw-resize';
  if (anchor === 'q') return 'pointer';
  return 'default';
};

interface RoughCanvasProps {}
const RoughCanvas: FC<RoughCanvasProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasState = useRef<CanvasState>('idle');
  const clickPos = useRef<Point>({ x: 0, y: 0 });
  const selectPayload = useRef<ClickPayload>({ anchor: null, ele: null });

  const [elements, setElements] = useState<RoughElement[]>([]);

  const { currTool, setTool } = useToolStore();
  const { options, setOptions, resetOptions } = useOptionStore();
  const { height, width } = useWindowSize();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Elements: ', elements);
      }
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'z') {
          console.log('Undo');
        }
      }
      if (event.key === 'Backspace' || event.key === 'Delete') {
        console.log('Delete');
        if (selectPayload.current.ele !== null) {
          const { ele } = selectPayload.current;
          setElements([...elements.filter((e) => e !== ele)]);
          selectPayload.current = { anchor: null, ele: null };
        }
      }
      if (event.shiftKey) {
        console.log('shift key is pressed');
      }
      switch (event.key) {
        case '1':
          setTool('select');
          break;
        case '2':
          setTool('line');
          break;
        case '3':
          setTool('arrow');
          break;
        case '4':
          setTool('rect');
          break;
        case '5':
          setTool('diamond');
          break;
        case '6':
          setTool('ellipse');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        console.log('shift key is released');
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [elements, setTool]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const rc = rough.canvas(canvasRef.current);
    const { ele } = selectPayload.current;
    if (currTool === 'select' && ele !== null)
      ele.updateOptions({ ...options });
    elements
      .filter((ele) => ele.isDrawable())
      .forEach(({ drawable }) => {
        rc.draw(drawable!);
      });
    if (currTool === 'select' && ele !== null)
      ele.getGizmo().forEach((g: Drawable) => rc.draw(g));
  }, [canvasRef, elements, height, width, options, currTool]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = event;
    clickPos.current = { x: clientX, y: clientY };
    if (currTool === 'select') {
      const payload = getClickPayload(elements, clientX, clientY);
      if (payload.ele !== null) {
        const { ele, anchor } = payload;
        setOptions(ele.options);
        if (anchor === 'inside') {
          ele.onSelect();
          canvasState.current = 'moving';
        } else canvasState.current = 'resize';
      } else resetOptions();
      selectPayload.current = payload;
    } else {
      canvasState.current = 'drawing';
      const newEle = RoughFactor.create(currTool, options, clientX, clientY);
      selectPayload.current.ele = newEle;
      setElements([...elements, newEle]);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasState.current === 'idle') {
      const { clientX, clientY } = event;
      (event.target as HTMLElement).style.cursor = cursorFromAnchor(
        getClickPayload(elements, clientX, clientY).anchor
      );
    } else if (canvasState.current === 'drawing') {
      const { clientX, clientY } = event;
      const ele = selectPayload.current.ele!;
      ele.onDraw(clientX, clientY);
      setElements([...elements]);
    } else if (canvasState.current === 'moving') {
      const { clientX, clientY } = event;
      const { x: hitX, y: hitY } = clickPos.current;
      const ele = selectPayload.current.ele!;
      ele.onMove(clientX - hitX, clientY - hitY);
      setElements([...elements]);
      (event.target as HTMLElement).style.cursor = cursorFromAnchor('inside');
    } else if (canvasState.current === 'resize') {
      const { clientX, clientY } = event;
      const { ele, anchor } = selectPayload.current;
      ele!.onResize(clientX, clientY, anchor);
      setElements([...elements]);
      (event.target as HTMLElement).style.cursor = cursorFromAnchor(anchor);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasState.current === 'drawing') {
      const ele = selectPayload.current.ele!;
      if (ele.isDrawable() && ele.isVisible()) {
        ele.onNormalize();
        setTool('select');
      } else selectPayload.current = { anchor: null, ele: null };
    } else if (canvasState.current === 'resize') {
      const ele = selectPayload.current.ele!;
      ele.onNormalize();
    }
    setElements([
      ...elements.filter((ele) => ele.isDrawable() && ele.isVisible()),
    ]);
    canvasState.current = 'idle';
  };

  const hidden = currTool === 'select' && selectPayload.current.ele === null;
  const optPanelType =
    selectPayload.current.ele === null
      ? currTool
      : selectPayload.current.ele.type;

  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.canvas} // Apply the CSS class
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <OptionPanel
        height={height}
        currTool={optPanelType}
        hidden={hidden}
      />
    </>
  );
};

export default RoughCanvas;
