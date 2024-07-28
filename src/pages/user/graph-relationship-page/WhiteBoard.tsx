import React, { useRef, useState, useEffect } from 'react';
import './WhiteBoard.css';

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<string>('select');
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  const handleToolSelect = (selectedTool: string) => {
    setTool(selectedTool);
  };

  const saveHistory = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      setHistory((prevHistory) => [...prevHistory, imageData]);
      setRedoStack([]);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    switch (tool) {
      case 'draw':
        saveHistory();
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, 2, 2);
        break;
      case 'square':
        saveHistory();
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, 50, 50);
        break;
      case 'circle':
        saveHistory();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'text':
        saveHistory();
        const text = prompt('Enter text:');
        if (text) {
          ctx.fillStyle = 'black';
          ctx.fillText(text, x, y);
        }
        break;
      case 'delete':
        saveHistory();
        ctx.clearRect(x, y, 50, 50);
        break;
      default:
        break;
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const lastState = newHistory.pop();
    if (!lastState || !canvasRef.current) return;

    setRedoStack((prevRedoStack) => [...prevRedoStack, lastState]);
    setHistory(newHistory);

    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.putImageData(lastState, 0, 0);
    }
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const newRedoStack = [...redoStack];
    const nextState = newRedoStack.pop();
    if (!nextState || !canvasRef.current) return;

    setHistory((prevHistory) => [...prevHistory, nextState]);
    setRedoStack(newRedoStack);

    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.putImageData(nextState, 0, 0);
    }
  };

  const handleExport = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard.png';
    link.click();
  };

  const handleZoom = (zoomIn: boolean) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    saveHistory();

    const scaleFactor = zoomIn ? 1.2 : 0.8;
    ctx.scale(scaleFactor, scaleFactor);
    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.putImageData(imageData, 0, 0);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'z') {
      handleUndo();
    } else if (e.ctrlKey && e.key === 'y') {
      handleRedo();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history, redoStack]);

  return (
    <div className="whiteboard-container">
      <div className="toolbar">
        {['arrow', 'square', 'circle', 'draw', 'text', 'hand', 'select', 'delete', 'undo', 'redo', 'zoomIn', 'zoomOut'].map((tool) => (
          <button
            key={tool}
            onClick={() => {
              if (tool === 'undo') handleUndo();
              else if (tool === 'redo') handleRedo();
              else if (tool === 'zoomIn') handleZoom(true);
              else if (tool === 'zoomOut') handleZoom(false);
              else if (tool === 'export') handleExport();
              else handleToolSelect(tool);
            }}
          >
            {tool}
          </button>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        className="whiteboard-canvas"
      />
    </div>
  );
};

export default Whiteboard;
