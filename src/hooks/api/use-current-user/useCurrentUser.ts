import { useSuspenseQuery } from '@tanstack/react-query';
import users from '../../../mocks/users/users.json';
import mockCover from '../../../mocks/users/assets/cover.png';

export const useCurrentUser = () => {
  return useSuspenseQuery({
    queryKey: ['currentUser'],
    queryFn: () => ({
      ...users.users[0],
      image: users.users[0].image,
      profileBackground: mockCover,
    }),
  });
};
