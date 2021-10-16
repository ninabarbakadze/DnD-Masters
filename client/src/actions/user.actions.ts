export const loginAction = (name: string) => ({
  type: 'LOGIN',
  payload: name,
});

export const logoutAction = () => ({
  type: 'LOGOUT',
});
// test editable component
export const updateAction = (name: string) => ({
  type: 'UPDATE',
  payload: name,
});
