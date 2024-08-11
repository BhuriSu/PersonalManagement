import { useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Button } from '@mui/material';
import { Delete, Save } from '@mui/icons-material';

type ArticleBlockProps = {
  block: any;
  updateBlock: (id: number, updatedBlock: any) => void;
  deleteBlock: (id: number) => void;
};

export default function ArticleBlock({ block, updateBlock, deleteBlock }: ArticleBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlock, setEditedBlock] = useState(block);

  const handleSave = () => {
    updateBlock(block.id, editedBlock);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="Title"
              value={editedBlock.title}
              onChange={(e) => setEditedBlock({ ...editedBlock, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Content"
              value={editedBlock.content}
              onChange={(e) => setEditedBlock({ ...editedBlock, content: e.target.value })}
            />
            <Button onClick={handleSave} startIcon={<Save />} variant={'contained'}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">{block.title}</Typography>
            <Typography>{block.content}</Typography>
          </>
        )}
        <IconButton onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <Save /> : <Delete />}
        </IconButton>
        {!isEditing && (
          <IconButton onClick={() => deleteBlock(block.id)}>
            <Delete />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
}
