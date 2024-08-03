import React, { useState } from 'react';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import './Graph.css';
import MainWhiteBoard from './MainWhiteBoard';
import NameModal from './NameModal'; // Import the NameModal component

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GraphPage: React.FC = () => {
  const [squares, setSquares] = useState<{ id: number; name: string }[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [nameModalOpen, setNameModalOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setNameModalOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameModalClose = () => {
    setNameModalOpen(false);
  };

  const handleSaveName = (name: string) => {
    setSquares((prev) => [...prev, { id: prev.length, name }]);
    setNameModalOpen(false);
    setOpen(true); // Open the dialog for the whiteboard after saving the name
  };

  return (
    <div className="Graph">
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
        <h3>Add graph</h3>
      </Button>
      <div className="grid-container">
        {squares.map((square) => (
          <div key={square.id} className="square" onClick={() => setOpen(true)}>
            {square.name}
          </div>
        ))}
      </div>
      <NameModal
        open={nameModalOpen}
        onClose={handleNameModalClose}
        onSave={handleSaveName}
      />
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
            <Typography sx={{ ml: 75, flex: 1 }} variant="h6" component="div">
              Graph Relationship Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Back
            </Button>
            <Button autoFocus color="inherit">
              Save
            </Button>
          </Toolbar>
          <MainWhiteBoard />
        </AppBar>
      </Dialog>
    </div>
  );
};

export default GraphPage;
