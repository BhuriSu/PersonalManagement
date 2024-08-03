import React, { useState } from 'react';
import { Paper, Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';


const socialMediaIcons = [
  { icon: <FacebookIcon fontSize="large" />, name: 'Facebook' },
  { icon: <RedditIcon fontSize="large" />, name: 'Reddit' },
  { icon: <TwitterIcon fontSize="large" />, name: 'Twitter' },
];

interface SocialMediaBlockProps {
  index: number;
  onLogin: (index: number, name: string) => void;
}

export const SocialMediaBlock: React.FC<SocialMediaBlockProps> = ({ index, onLogin }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socialMedia, setSocialMedia] = useState<string | null>(null);

  const handleIconClick = (name: string) => {
    setIsDialogOpen(true);
    setSocialMedia(name);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    onLogin(index, socialMedia!);
    setIsDialogOpen(false);
  };

  return (
    <Paper elevation={8} className="social-media-block">
      {isLoggedIn ? (
        <Box sx={{ width: '100%', height: '100%' }}>
          <iframe
            src={`https://www.${socialMedia?.toLowerCase()}.com`}
            title={socialMedia!}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          ></iframe>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          {socialMediaIcons.map((media) => (
            <IconButton key={media.name} onClick={() => handleIconClick(media.name)}>
              {media.icon}
            </IconButton>
          ))}
        </Box>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Login to {socialMedia}</DialogTitle>
        <DialogContent>

          <Box>Login/Signup form for {socialMedia}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained">Login</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SocialMediaBlock;
