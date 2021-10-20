interface User {
  username: string;
  email?: string;
  password: string;
}

const headers = new Headers({ 'Content-Type': 'application/json' });

const registerUser = (user: User) =>
  // eslint-disable-next-line
  fetch('http://localhost:3001/register', {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => res);

const logIn = (user: User) =>
  // eslint-disable-next-line
  fetch('http://localhost:3001/logIn', {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => res);

const getUser = () =>
  // eslint-disable-next-line
  fetch('http://localhost:3001/user', {
    method: 'GET',
    headers,
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => res);

export { registerUser, logIn, getUser };
