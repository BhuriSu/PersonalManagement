import { UserMenu } from '../user-menu/UserMenu';
import { Stack} from '@mui/material';
import { useCurrentUser } from '../../../../hooks/api/use-current-user/useCurrentUser';
import { Notifications } from '../notifications/Notifications';

export const ToolbarElements = () => {
  const { data: user } = useCurrentUser();

  if (!user) return null;
  return (
    <Stack direction={'row'} spacing={2}>
      <Notifications />
      <UserMenu user={user} />
    </Stack>
  );
};
