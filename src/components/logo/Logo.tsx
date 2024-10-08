import { Box, Typography, useTheme } from '@mui/material';
import logo from '../../assets/logo.svg';

interface Params {
  invertImage?: boolean;
}

export const Logo = ({ invertImage }: Params) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        cursor: 'pointer',
        '&:hover': { opacity: 0.8 },
      }}
      component={'a'}
    >
      <Box sx={{ filter: `invert(${invertImage ? '1' : '0'})` }}>
        <Box
          component={'img'}
          src={logo}
          alt={''}
          sx={{ maxWidth: '40px', mr: 2, filter: `invert(${theme.palette.mode === 'light' ? '0' : '1'})` }}
        />
      </Box>
      <Typography variant={'h4'} component={'h1'} fontSize={'1.4rem'} fontWeight={'fontWeightBold'}>
        DeepConnection
      </Typography>
    </Box>
  );
};
