import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface NameModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const NameModal: React.FC<NameModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState<string>('');

  const handleSave = () => {
    onSave(name);
    setName(''); // Reset the name field after saving
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NameModal;