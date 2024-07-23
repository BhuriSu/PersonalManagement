import { Stack, Typography } from '@mui/material';
import { Logo } from '../../components/logo/Logo.tsx';

export const WelcomeContent = () => {
  return (
    <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
      <Logo invertImage />
      <Typography variant={'h3'} component={'h1'}>
        Welcome to YourOwnData
      </Typography>
      <Typography variant={'body1'}>All In One Data that you want to have</Typography>
    </Stack>
  );
};
