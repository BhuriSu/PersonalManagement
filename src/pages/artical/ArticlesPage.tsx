import { useState } from 'react';
import { Button, Container, Stack, Typography, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { PageHeader } from '../../components/page-header/PageHeader';
import  ArticleBlock from './ArticleBlock'; 
import './ArticleBlock'

export default function ArticlePage() {
  const [blocks, setBlocks] = useState<number[]>([0]);
  const addBlock = () => {
    setBlocks((prev) => [...prev, prev.length]);
  };

  return (
    <Container maxWidth={'lg'}>
      <PageHeader
        title={'Article'}
        breadcrumbs={['Article', 'List']}
        renderRight={
          <Button onClick={addBlock} startIcon={<Add />} variant={'contained'}>
            Add Another Article Block
          </Button>
        }
      />
      <Stack mt={4} mb={4} spacing={2}>
        <Typography variant={'body1'} color={'text.secondary'}>
          When you have a lot of important articles to read you can keep them in this service.
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
        {blocks.map((index) => (
          <ArticleBlock key={index} index={index} />
        ))}
      </Box>
    </Container>
  );
}
