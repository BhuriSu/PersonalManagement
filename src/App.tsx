import { CssBaseline, Fade, ThemeProvider } from '@mui/material';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { routes } from './constants/routes.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrentUser } from './hooks/api/use-current-user/useCurrentUser';
import { Loader } from './components/loader/Loader';
import { ThemeConfigurator } from './demo/theme-configurator/ThemeConfigurator';
import React, { Suspense, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { getThemeByName } from './theme/theme.ts';
import { SidebarLayout } from './layouts/sidebar-layout/SidebarLayout.tsx';

const Dashboard = React.lazy(() => import('./pages/dashboard'));
const UserAccountPage = React.lazy(() => import('./pages/user/user-account-page/UserAccountPage'));
const ProfileListPage = React.lazy(() => import('./pages/user/profile-list-page/ProfileListPage'));
const DealListPage = React.lazy(() => import('./pages/user/deal-list-page/DealListPage'));
const GraphPage = React.lazy(() => import('./pages/user/graph-relationship-page/GraphPage'));
const ConversationPage = React.lazy(() => import('./pages/conversation/ConversationPage.tsx'));
const CalendarPage = React.lazy(() => import('./pages/calendar/Calendar'));
const UrgencyPage = React.lazy(() => import('./pages/urgency/UrgencyPage'));
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
        path: routes.dealList,
        element: <DealListPage />,
      },
      {
        path: routes.graph,
        element: <GraphPage />,
      },
      {
        path: routes.conversation,
        element: <ConversationPage />,
      },
      {
        path: routes.urgency,
        element: <UrgencyPage />,
      },
      {
        path: routes.calendar,
        element: <CalendarPage />,
      },
    ],
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
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
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
