import { Stack, Typography } from '@mui/material';
import { Logo } from '../../components/logo/Logo.tsx';

export const WelcomeContent = () => {
  return (
    <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
      <Logo invertImage />
      <Typography variant={'h4'} component={'h3'}>
        Welcome to Your Connection
      </Typography>
      <Typography variant={'body1'}>All In One Connection Platform</Typography>
    </Stack>
  );
};
