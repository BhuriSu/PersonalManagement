import { useState } from 'react';
import { Button, Container, Stack, Typography, Box, Modal, TextField, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { PageHeader } from '../../components/page-header/PageHeader';

interface Block {
  note: string;
}

export default function ConversationPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [note, setNote] = useState('');

  const handleAddBlock = () => {
    setBlocks([...blocks, { note: '' }]);
  };

  const handleBlockClick = (index: number) => {
    setSelectedBlockIndex(index);
    setNote(blocks[index].note);
    setOpen(true);
  };

  const handleSaveNote = () => {
    if (selectedBlockIndex !== null) {
      const updatedBlocks = [...blocks];
      updatedBlocks[selectedBlockIndex].note = note;
      setBlocks(updatedBlocks);
      setOpen(false);
    }
  };

  const handleDeleteNote = () => {
    if (selectedBlockIndex !== null) {
      const updatedBlocks = blocks.filter((_, i) => i !== selectedBlockIndex);
      setBlocks(updatedBlocks);
      setOpen(false);
      setSelectedBlockIndex(null); // Reset the selected block index
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth={'lg'}>
      <PageHeader
        title={'Conversation'}
        breadcrumbs={['Conversation', 'List']}
        renderRight={
          <Button startIcon={<Add />} variant={'contained'} onClick={handleAddBlock}>
            Add Conversation 
          </Button>
        }
      />
      <Stack mt={4} mb={4} spacing={2}>
        <Typography variant={'body1'} color={'text.secondary'}>
          You can keep your important conversations from your connection.
        </Typography>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {blocks.map((block, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 150,
              border: '1px solid #999', // Lower weight of the border
              borderRadius: 2,
              cursor: 'pointer',
              position: 'relative',
              padding: 2,
              backgroundColor: '#000', // Black background for all squares
              color: block.note ? '#fff' : '#000', // White text if note exists, otherwise black
            }}
            onClick={() => handleBlockClick(index)}
          >
            {block.note ? (
              <Typography variant="body2" sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>
                {block.note}
              </Typography>
            ) : (
              <Add sx={{ fontSize: 50, color: '#fff' }} /> // White "+" symbol
            )}
          </Box>
        ))}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            width: '80vw',
            height: '80vh',
            bgcolor: 'background.paper',
            p: 4,
            outline: 'none',
            boxShadow: 24,
          }}
        >
          <Typography variant={'h4'}>
            Note for Conversation {selectedBlockIndex !== null ? selectedBlockIndex + 1 : ''}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleSaveNote}>
              Save
            </Button>
            <IconButton color="error" onClick={handleDeleteNote}>
              <Delete />
            </IconButton>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
