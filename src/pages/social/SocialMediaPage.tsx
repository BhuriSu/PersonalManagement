import { useState } from 'react';
import { Button, Container, Stack, Typography, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { PageHeader } from '../../components/page-header/PageHeader';
import SocialMediaBlock from './SocialMediaBlock';
import './SocialMediaBlockPage.css';

export default function SocialMediaPage() {
  const [blocks, setBlocks] = useState<number[]>([0]);
  const [, setSocialMediaLogin] = useState<{ [key: number]: string }>({});

  const addBlock = () => {
    setBlocks((prev) => [...prev, prev.length]);
  };

  const handleLogin = (index: number, name: string) => {
    setSocialMediaLogin((prev) => ({ ...prev, [index]: name }));
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
          <SocialMediaBlock key={index} index={index} onLogin={handleLogin} />
        ))}
      </Box>
    </Container>
  );
}
