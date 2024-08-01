import { Provider as StoreProvider } from 'react-redux';
import { ModalProvider } from '../contexts/modal';
import { NotificationsProvider } from '../contexts/notifications';
import { store } from '../stores/store';
import { ThemeProvider } from '../contexts/theme';

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <StoreProvider store={store}>
   
        <ThemeProvider>
          <ModalProvider>
            <NotificationsProvider>{children}</NotificationsProvider>
          </ModalProvider>
        </ThemeProvider>
 
    </StoreProvider>
  );
};
