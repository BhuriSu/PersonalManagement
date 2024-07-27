const themePrefix = '/theme';
const userPrefix = '/user';
const blogPrefix = '/blog';
const componentPrefix = `${themePrefix}/component`;

export const routes = {
  dashboard: '/',
  user: userPrefix,
  userAccount: `${userPrefix}/account`,
  userProfile: `${userPrefix}/profile`,
  dealList: `${userPrefix}/deal`,
  graph: `${userPrefix}/graph`,
  social: `${blogPrefix}/social`,
  urgency: `${userPrefix}/urgency`,
  themeTypography: `${themePrefix}/typography`,
  themeColors: `${themePrefix}/colors`,
  componentsButton: `${componentPrefix}/button`,
  calendar: `/calendar`,
  todoList: '/todo-list',
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  verifyCode: '/verify-code',
};
