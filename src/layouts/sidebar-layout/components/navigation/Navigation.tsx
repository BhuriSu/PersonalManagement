import List from '@mui/material/List';
import { NavigationItem } from './components/navigation-item/NavigationItem';
import { NavigationItemType } from './components/navigation-item/types';
import { routes } from '../../../../contants/routes';
import {
  Abc,
  AccountBoxOutlined,
  CalendarMonthOutlined,
  ConstructionOutlined,
  DashboardOutlined,
  DesignServicesOutlined,
  ListAltOutlined,
  Login,
  Notes,
  QuestionMarkOutlined,
  ShapeLineOutlined,
  SystemUpdate,
  ViewStreamOutlined,
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
        header: 'Pages',
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
            path: routes.userList,
            label: 'Deal List',
          },
          {
            path: routes.userEdit,
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
            path: routes.blog,
            label: 'Social Media List',
          },
        ],
      },
      {
        label: 'Urgency',
        icon: (props: any) => <SystemUpdate {...props} />,
        description: 'Urgent pages',
        items: [
          {
            path: routes.notFound,
            label: '(404) Page not found',
            icon: (props: any) => <QuestionMarkOutlined {...props} />,
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
        header: 'Apps',
      },
      {
        path: routes.calendar,
        label: 'Calendar',
        icon: (props: any) => <CalendarMonthOutlined {...props} />,
      },
      {
        path: routes.todoList,
        label: 'Tasks',
        icon: (props: any) => <ListAltOutlined {...props} />,
      },
      {
        header: 'Documentation',
      },
      {
        label: 'Theme',
        icon: (props: any) => <DesignServicesOutlined {...props} />,
        items: [
          {
            path: routes.themeTypography,
            label: 'Typography',
          },
          {
            path: routes.themeColors,
            label: 'Colors',
          },
        ],
      },
      {
        label: 'Components',
        icon: (props: any) => <ShapeLineOutlined {...props} />,
        items: [
          {
            path: routes.componentsButton,
            label: 'Button',
          },
        ],
      },
      {
        header: 'Navigation',
      },
      {
        path: '',
        label: 'Number',
        icon: (props: any) => <ViewStreamOutlined {...props} />,
        badgeText: `${notifications?.notifications?.length}`,
        badgeColor: 'primary',
      },
      {
        path: '',
        label: 'Description',
        icon: (props: any) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'info',
        description: 'This is a description',
      },
      {
        path: '',
        label: 'Disabled',
        icon: (props: any) => <ViewStreamOutlined {...props} />,
        badgeColor: 'info',
        disabled: true,
        description: 'This is a disabled item',
      },
      {
        path: '',
        label: 'Color primary',
        icon: (props: any) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'primary',
      },
      {
        path: '',
        label: 'Color secondary',
        icon: (props: any) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'secondary',
      },
      {
        path: '',
        label: 'Color info',
        icon: (props: any) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'info',
      },
      {
        path: '',
        label: 'Very long text as a link text',
        icon: (props: any) => <ViewStreamOutlined {...props} />,
        badgeText: 'New',
        badgeColor: 'info',
        external: true,
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
