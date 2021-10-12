export const loginAction = (name: string) => ({
  type: 'LOGIN',
  payload: name,
});

export const logoutAction = () => ({
  type: 'LOGOUT',
});
