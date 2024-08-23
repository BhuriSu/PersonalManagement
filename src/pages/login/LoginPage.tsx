import { useState } from 'react';
import { Button, Divider, FormControl, Link, Stack, TextField, Typography, Alert } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { WelcomeContent } from '../../content/welcome-content/WelcomeContent';
import { HalfLayout } from '../../layouts/half-layout/HalfLayout';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase'; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(routes.dashboard);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate(routes.dashboard);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <HalfLayout>
      <WelcomeContent />
      <Stack spacing={2} sx={{ minWidth: '60%' }} alignItems={'center'}>
        <Typography variant={'h4'} component={'h1'}>
          Keep your connection secret!
        </Typography>
        <Typography variant={'body1'}>Enter your credentials below</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <FormControl fullWidth>
          <TextField 
            fullWidth 
            placeholder={'Email'} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField 
            fullWidth 
            placeholder={'Password'} 
            type={'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </FormControl>

        <Button variant={'contained'} fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Divider sx={{ width: '100%' }} />
        <Typography variant={'body2'}>Or login with</Typography>
        <Stack direction={'row'} spacing={1}>
          <Button variant={'outlined'} startIcon={<Google />} onClick={handleGoogleLogin}>
            Google
          </Button>
          <Button variant={'outlined'} startIcon={<Facebook />}>
            Facebook
          </Button>
        </Stack>
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
            Forgot password?{' '}
            <Link
              onClick={() => navigate(routes.resetPassword)}
              component={'button'}
              underline={'hover'}
              fontWeight={'fontWeightMedium'}
            >
              Reset password
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </HalfLayout>
  );
}
