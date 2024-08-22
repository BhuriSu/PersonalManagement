import { useMemo } from 'react';
import List from '@mui/material/List';
import { NavigationItem } from './components/navigation-item/NavigationItem';
import { NavigationItemType } from './components/navigation-item/types';
import { routes } from '../../../../constants/routes';

// Import the images
import dashboard from '../../../../assets/dashboard.png';
import urgency from '../../../../assets/urgency.png';
import calendar from '../../../../assets/calendar.png';
import user from '../../../../assets/user.png';
import conversation from '../../../../assets/conversation.png';
import authentication from '../../../../assets/authentication.png';

export function Navigation() {

  const navigationItems: NavigationItemType[] = useMemo(
    () => [
      {
        header: 'Dashboards',
      },
      {
        path: routes.dashboard,
        label: 'Dashboard',
        icon: () => <img src={dashboard} alt="Dashboard" style={{ width: '30px', height: '30px' }} />,
      },
      {
        header: 'Main Pages',
      },
      {
        label: 'User',
        icon: () => <img src={user} alt="User" style={{ width: '30px', height: '30px' }} />,
        description: 'Connection Management',
        items: [
          {
            path: routes.userAccount,
            label: 'Account',
          },
          {
            path: routes.userProfile,
            label: 'Profile List',
          },
          {
            path: routes.dealList,
            label: 'Deal List',
          },
          {
            path: routes.map,
            label: 'Map Relationship',
          },
        ],
      },
      {
        label: 'Conversation',
        icon: () => <img src={conversation} alt="Conversation" style={{ width: '30px', height: '30px' }} />,
        description: 'Conversation Note',
        items: [
          {
            path: routes.conversation,
            label: 'Conversation List',
          },
        ],
      },
      {
        label: 'Urgency',
        icon: () => <img src={urgency} alt="Urgency" style={{ width: '30px', height: '30px' }} />,
        description: 'Urgent Page',
        items: [
          {
            path: routes.urgency,
            label: 'Urgency List',
          },
        ],
      },
      {
        label: 'Authentication',
        icon: () => <img src={authentication} alt="Authentication" style={{ width: '30px', height: '30px' }} />,
        description: 'Authentication Pages',
        items: [
          {
            path: routes.login,
            label: 'Login',
          },
          {
            path: routes.register,
            label: 'Register',
          },
          {
            path: routes.resetPassword,
            label: 'Reset Password',
          },
          {
            path: routes.verifyCode,
            label: 'Verify Code',
          },
        ],
      },
      {
        header: 'Calendar',
      },
      {
        path: routes.calendar,
        label: 'Calendar',
        icon: () => <img src={calendar} alt="Calendar" style={{ width: '30px', height: '30px' }} />,
      },
    ],
    [],
  );

  const navigationItemsList = navigationItems.map((item) => {
    return <NavigationItem key={Object.values(item).toString()} item={item} />;
  });

  return (
    <List sx={{ width: '100%', maxWidth: 360, padding: 2 }} component='nav' aria-labelledby='nested-list-subheader'>
      {navigationItemsList}
    </List>
  );
}