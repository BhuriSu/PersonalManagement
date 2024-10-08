import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Snackbar,
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import './Map.css';
import { PageHeader } from '../../../components/page-header/PageHeader';
import MainWhiteBoard from './MainWhiteBoard';
import NameModal from './NameModal';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Map {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  components: any[]; // or a more specific type depending on the components
}

const MapPage: React.FC = () => {
  const [squares, setSquares] = useState<Map[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [nameModalOpen, setNameModalOpen] = useState<boolean>(false);
  const [selectedSquare, setSelectedSquare] = useState<Map | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/maps/')
      .then(response => setSquares(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleClickOpen = () => {
    setNameModalOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSquare(null); 
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleNameModalClose = () => {
    setNameModalOpen(false);
  };

  const handleSaveName = async (name: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/maps/create/', { name });
      const newSquare: Map = { ...response.data, components: [] }; 
      setSquares(prev => [...prev, newSquare]);
      setNameModalOpen(false);
      setSnackbarMessage('Square created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to create square:', error);
      setSnackbarMessage('Failed to create square');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSquareClick = (square: Map) => {
    setSelectedSquare(square);
    setOpen(true);
  };

  const handleDeleteClick = () => {
    if (selectedSquare) {
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedSquare) {
      try {
        await axios.delete(`http://localhost:8000/api/maps/delete/${selectedSquare.id}/`);
        setSquares(squares.filter(square => square.id !== selectedSquare.id));
        setSnackbarMessage('Square deleted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
        setOpen(false);
      } catch (error) {
        console.error('Failed to delete square:', error);
        setSnackbarMessage('Failed to delete square');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div className="Map">
      <PageHeader title={'Map List'} />
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
        <h3>Add Map</h3>
      </Button>
      <div className="grid-container">
        {squares.map(square => (
          <div key={square.id} className="square" onClick={() => handleSquareClick(square)}>
            <Typography variant="h6">{square.name}</Typography>
          </div>
        ))}
      </div>
      <NameModal open={nameModalOpen} onClose={handleNameModalClose} onSave={handleSaveName} />
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 75, flex: 1 }} variant="h6" component="div">
              Map Relationship Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Back
            </Button>
            <IconButton color="inherit" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Toolbar>
          <MainWhiteBoard />
        </AppBar>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure you want to delete this square?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this square will remove it permanently. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MapPage;
