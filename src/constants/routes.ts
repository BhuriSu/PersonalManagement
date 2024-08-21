
const userPrefix = '/user';
const blogPrefix = '/blog';

export const routes = {
  dashboard: '/',
  user: userPrefix,
  userAccount: `${userPrefix}/account`,
  userProfile: `${userPrefix}/profile`,
  dealList: `${userPrefix}/deal`,
  graph: `${userPrefix}/graph`,
  conversation: `${blogPrefix}/conversation`,
  urgency: `${userPrefix}/urgency`,
  calendar: `/calendar`,
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  verifyCode: '/verify-code',
};
