// src/components/user-menu/UserMenu.tsx
import {
  UserMenuContainer,
  UserMenuIconButton,
  UserMenuInfo,
  UserMenuMenu,
  UserMenuMenuItemWithSeparator,
} from './styled';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { UserAvatar } from '../../../../components/user-avatar/UserAvatar';
import { routes } from '../../../../constants/routes';
import { auth } from '../../../../firebase'; // Import Firebase auth
import { User } from 'firebase/auth'; // Correct import for User type

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null); // Use User type from 'firebase/auth'
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <UserMenuContainer>
      <UserMenuIconButton sx={{ padding: 0 }} onClick={handleClick}>
        <UserAvatar src={user?.photoURL || ''} />
      </UserMenuIconButton>
      <UserMenuMenu
        id='user-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <UserMenuInfo>
          <Typography fontSize={14} color={'text.secondary'}>
            {user?.email || 'Not signed in'}
          </Typography>
          <UserMenuMenuItemWithSeparator onClick={() => { 
            auth.signOut();
            navigate(routes.login);
          }}>
            Logout
          </UserMenuMenuItemWithSeparator>
        </UserMenuInfo>
      </UserMenuMenu>
    </UserMenuContainer>
  );
};
