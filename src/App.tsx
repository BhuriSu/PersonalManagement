import { CssBaseline, Fade, ThemeProvider } from '@mui/material';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { routes } from './contants/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrentUser } from './hooks/api/use-current-user/useCurrentUser';
import { Loader } from './components/loader/Loader';
import { ThemeConfigurator } from './demo/theme-configurator/ThemeConfigurator';
import React, { Suspense, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { getThemeByName } from './theme/theme.ts';
import { SidebarLayout } from './layouts/sidebar-layout/SidebarLayout.tsx';

const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const UserAccountPage = React.lazy(() => import('./pages/user/user-account-page/UserAccountPage'));
const ProfileListPage = React.lazy(() => import('./pages/user/profile-list-page/ProfileListPage.tsx'));
const DealListPage = React.lazy(() => import('./pages/user/deal-list-page/DealListPage.tsx'));
const GraphPage = React.lazy(() => import('./pages/user/graph-relationship-page/GraphPage.tsx'));
const SocialMediaPage = React.lazy(() => import('./pages/social-media-page/SocialMediaPage.tsx'));
const ColorsPage = React.lazy(() => import('./docs/pages/colors-page/ColorsPage'));
const TypographyPage = React.lazy(() => import('./docs/pages/typography-page/TypographyPage'));
const ButtonPage = React.lazy(() => import('./docs/pages/button-page/ButtonPage'));
const CalendarPage = React.lazy(() => import('./pages/calendar/Calendar'));
const TodoList = React.lazy(() => import('./pages/todo-list/TodoList'));
const NotFoundPage = React.lazy(() => import('./pages/not-found/NotFoundPage'));
const MaintenancePage = React.lazy(() => import('./pages/maintenance/MaintenancePage'));
const LoginPage = React.lazy(() => import('./pages/login/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/register/RegisterPage'));
const ResetPassword = React.lazy(() => import('./pages/reset-password/ResetPassword'));
const VerifyCode = React.lazy(() => import('./pages/verify-code/VerifyCode'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SidebarLayout>
        <Suspense>
          <Fade in={true} timeout={500}>
            <div>
              <Outlet />
            </div>
          </Fade>
        </Suspense>
      </SidebarLayout>
    ),
    children: [
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
      {
        path: routes.userAccount,
        element: <UserAccountPage />,
      },
      {
        path: routes.userProfile,
        element: <ProfileListPage />,
      },
      {
        path: routes.userList,
        element: <DealListPage />,
      },
      {
        path: routes.userEdit,
        element: <GraphPage />,
      },
      {
        path: routes.blog,
        element: <SocialMediaPage />,
      },
      {
        path: routes.themeColors,
        element: <ColorsPage />,
      },
      {
        path: routes.themeTypography,
        element: <TypographyPage />,
      },
      {
        path: routes.componentsButton,
        element: <ButtonPage />,
      },
      {
        path: routes.calendar,
        element: <CalendarPage />,
      },
      {
        path: routes.todoList,
        element: <TodoList />,
      },
    ],
  },
  {
    path: routes.notFound,
    element: (
      <Suspense>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: routes.maintenance,
    element: (
      <Suspense>
        <MaintenancePage />
      </Suspense>
    ),
  },
  {
    path: routes.login,
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: routes.register,
    element: (
      <Suspense>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: routes.resetPassword,
    element: (
      <Suspense>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: routes.verifyCode,
    element: (
      <Suspense>
        <VerifyCode />
      </Suspense>
    ),
  },
]);

const queryClient = new QueryClient();

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const AppRouter = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader />;
  }
  if (!user) return null;
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [themeName, setThemeName] = useState<'appTheme' | 'shadTheme'>('shadTheme');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = getThemeByName(themeName, mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Analytics />
        <QueryClientProvider client={queryClient}>
          <>
            <AppRouter />
            <ThemeConfigurator setThemeName={setThemeName} themeName={themeName} />
          </>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}