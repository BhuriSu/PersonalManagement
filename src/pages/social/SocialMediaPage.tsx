import React, { useState } from 'react';
import {
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { PageHeader } from '../../components/page-header/PageHeader';
import { Loader } from '../../components/loader/Loader';
import { useBlogPosts } from '../../hooks/api/use-blog-posts';
import './SocialMediaBlockPage.css';

export const SocialMediaBlock: React.FC = () => {
  return (
    <Paper elevation={8} className="social-media-block">
      <Stack spacing={2} alignItems="center" justifyContent="center" height="100%">
        <Typography variant="h6">Social Media Block</Typography>
      </Stack>
    </Paper>
  );
};

export default function SocialMediaPage() {
  const { isLoading } = useBlogPosts();
  const [blocks, setBlocks] = useState<number[]>([]);
  const addBlock = () => {
    setBlocks((prev) => [...prev, prev.length]);
  };

  return (
    <Container maxWidth={'lg'}>
      <PageHeader
        title={'Social Media'}
        breadcrumbs={['Social', 'List']}
        renderRight={
          <Button onClick={addBlock} startIcon={<Add />} variant={'contained'}>
            Add Another Social Media Block
          </Button>
        }
      />
      <Stack mt={4} mb={4} spacing={2}>
        <Typography variant={'h4'}>Social Media Blog</Typography>
        <Typography variant={'body1'} color={'text.secondary'}>
          When you have a lot of social media or articles to read, you can use our service to manage them simultaneously
          in realtime.
        </Typography>
      </Stack>
      {isLoading && <Loader />}
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
          <SocialMediaBlock key={index} />
        ))}
      </Box>
    </Container>
  );
}
