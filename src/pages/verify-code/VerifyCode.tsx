import { useState } from 'react';
import { Button, Divider, FormControl, Link, Stack, TextField, Typography, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { HalfLayout } from '../../layouts/half-layout/HalfLayout';
import { WelcomeContent } from '../../content/welcome-content/WelcomeContent';
import { applyActionCode } from 'firebase/auth';
import { auth } from '../../firebase'; // Import your Firebase configuration

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleVerifyCode = async () => {
    setError(null);
    setMessage(null);

    const query = new URLSearchParams(location.search);
    const actionCode = query.get('oobCode') || code; // Get the code from query params or user input

    if (!actionCode) {
      setError('No verification code found.');
      return;
    }

    try {
      await applyActionCode(auth, actionCode);
      setMessage('Email verified successfully. You can now log in.');
      navigate(routes.login); // Redirect to login page after successful verification
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <HalfLayout>
      <WelcomeContent />
      <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
        <Typography variant={'h3'} component={'h1'}>
          Verify code
        </Typography>
        <Typography variant={'body1'}>Enter the code from the email we sent.</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <FormControl fullWidth>
          <TextField 
            fullWidth 
            placeholder={'Code'} 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
          />
        </FormControl>
        <Button variant={'contained'} fullWidth onClick={handleVerifyCode}>
          Verify code
        </Button>
        <Divider sx={{ width: '100%' }} />
        <Stack spacing={1}>
          <Typography
            variant={'body2'}
            sx={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
          >
            Don't have an account?{' '}
            <Link
              onClick={() => navigate(routes.register)}
              underline={'hover'}
              component={'button'}
              fontWeight={'fontWeightMedium'}
            >
              Sign up
            </Link>
          </Typography>
          <Typography
            variant={'body2'}
            sx={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
          >
            Already have an account?{' '}
            <Link
              onClick={() => navigate(routes.login)}
              component={'button'}
              underline={'hover'}
              fontWeight={'fontWeightMedium'}
            >
              Log in
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </HalfLayout>
  );
}
