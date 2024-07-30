import React, { useState } from 'react';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, List, Slide } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { WhiteBoard } from './WhiteBoard';
import './Graph.css';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GraphPage: React.FC = () => {
  const [squares, setSquares] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const addSquare = () => {
    setSquares((prev) => [...prev, prev.length]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="Graph">
     
      <Button color="primary" startIcon={<AddIcon />} onClick={addSquare}>
        <h3>Add graph</h3>
      </Button>
     
      <div className="grid-container">
        {squares.map((square) => (
          <div key={square} className="square" onClick={handleClickOpen}></div>
        ))}
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Graph Relationship Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
        <WhiteBoard/>
        </List>
      </Dialog>
    </div>
  );
};

export default GraphPage;
