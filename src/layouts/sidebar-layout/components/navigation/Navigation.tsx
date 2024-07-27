import List from '@mui/material/List';
import { NavigationItem } from './components/navigation-item/NavigationItem';
import { NavigationItemType } from './components/navigation-item/types';
import { routes } from '../../../../contants/routes';
import {
  AccountBoxOutlined,
  CalendarMonthOutlined,
  DashboardOutlined,
  Login,
  Notes,
} from '@mui/icons-material';
import { useMemo } from 'react';
import { useNotifications } from '../../../../hooks/api/use-notifications/useNotifications';

export function Navigation() {
  const { data: notifications } = useNotifications();

  const navigationItems: NavigationItemType[] = useMemo(
    () => [
      {
        header: 'Dashboards',
      },
      {
        path: routes.dashboard,
        label: 'Dashboard',
        icon: (props: any) => <DashboardOutlined {...props} />,
      },
      {
        header: 'Main pages',
      },
      {
        label: 'User',
        icon: (props: any) => <AccountBoxOutlined {...props} />,
        description: 'Connection management',
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
            path: routes.graph,
            label: 'Graph Relationship',
          },
        ],
      },
      {
        label: 'Media',
        icon: (props: any) => <Notes {...props} />,
        description: 'Social Media management',
        items: [
          {
            path: routes.social,
            label: 'Social Media List',
          },
        ],
      },
      {
        label: 'Urgency',
        icon: (props: any) => <AccountBoxOutlined {...props} />,
        description: 'Urgent page',
        items: [
          {
            path: routes.urgency,
            label: 'Urgency list',
          },
        ],
      },
      {
        label: 'Authentication',
        icon: (props: any) => <Login {...props} />,
        description: 'Authentication pages',
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
            label: 'Reset password',
          },
          {
            path: routes.verifyCode,
            label: 'Verify code',
          },
        ],
      },
      {
        header: 'Calendar',
      },
      {
        path: routes.calendar,
        label: 'Calendar',
        icon: (props: any) => <CalendarMonthOutlined {...props} />,
      },
    ],
    [notifications?.notifications?.length],
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
