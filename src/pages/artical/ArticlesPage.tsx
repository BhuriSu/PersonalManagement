import { useState, useEffect } from 'react';
import { Button, Container, Stack, Typography, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { PageHeader } from '../../components/page-header/PageHeader';
import ArticleBlock from './ArticleBlock';
import axios from 'axios';

export default function ArticlePage() {
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/articles/')
      .then(response => setBlocks(response.data))
      .catch(error => console.log('Error fetching blocks:', error));
  }, []);

  const addBlock = () => {
    const newBlock = { title: '', content: '' }; 
    axios.post('http://localhost:8000/api/articles/create/', newBlock)
      .then(response => {
        setBlocks(prev => [...prev, response.data]);
      })
      .catch(error => console.log('Error adding block:', error));
  };

  const updateBlock = (id: number, updatedBlock: any) => {
    axios.put(`http://localhost:8000/api/articles/update/${id}/`, updatedBlock)
      .then(response => {
        setBlocks(prev => prev.map(block => block.id === id ? response.data : block));
      })
      .catch(error => console.log('Error updating block:', error));
  };

  const deleteBlock = (id: number) => {
    axios.delete(`http://localhost:8000/api/articles/delete/${id}/`)
      .then(() => {
        setBlocks(prev => prev.filter(block => block.id !== id));
      })
      .catch(error => console.log('Error deleting block:', error));
  };

  return (
    <Container maxWidth={'lg'}>
      <PageHeader
        title={'Article'}
        breadcrumbs={['Article', 'List']}
        renderRight={
          <Button onClick={addBlock} startIcon={<Add />} variant={'contained'}>
            Add Article 
          </Button>
        }
      />
      <Stack mt={4} mb={4} spacing={2}>
        <Typography variant={'body1'} color={'text.secondary'}>
          When you have article for your connection that you want to keep it secretly.
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
        {blocks.map((block) => (
          <ArticleBlock 
            key={block.id} 
            block={block} 
            updateBlock={updateBlock}
            deleteBlock={deleteBlock}
          />
        ))}
      </Box>
    </Container>
  );
}
