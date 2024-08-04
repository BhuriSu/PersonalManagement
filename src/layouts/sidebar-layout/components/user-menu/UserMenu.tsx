import {
  UserMenuContainer,
  UserMenuIconButton,
  UserMenuInfo,
  UserMenuMenu,
  UserMenuMenuItemWithSeparator,
} from './styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { UserAvatar } from '../../../../components/user-avatar/UserAvatar';
import { routes } from '../../../../constants/routes';

export const UserMenu = ({ user }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <UserMenuContainer>
      <UserMenuIconButton sx={{ padding: 0 }} onClick={handleClick}>
        <UserAvatar src={user.image} />
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
            {user.email}
          </Typography>
        <UserMenuMenuItemWithSeparator onClick={() => navigate(routes.login)}>Logout</UserMenuMenuItemWithSeparator>
        </UserMenuInfo>
      </UserMenuMenu>
    </UserMenuContainer>
  );
};
