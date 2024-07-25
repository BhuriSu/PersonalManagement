import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './Graph.css';

const GraphPage: React.FC = () => {
  const [squares, setSquares] = useState<number[]>([]);

  const addSquare = () => {
    setSquares((prev) => [...prev, prev.length]);
  };

  return (
    <div className='Graph'>
      <Button color='primary' startIcon={<AddIcon />} onClick={addSquare}>
        <h3>Add graph</h3>
      </Button>
      <div className='grid-container'>
        {squares.map((square) => (
          <div key={square} className='square'></div>
        ))}
      </div>
    </div>
  );
};

export default GraphPage;
