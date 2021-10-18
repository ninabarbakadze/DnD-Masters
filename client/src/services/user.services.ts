interface User {
  username: string;
  email?: string;
  password: string;
}

const headers = new Headers({ 'Content-Type': 'application/json' });

const registerUser = (user: User) => {
  console.log(user);
  fetch('http://localhost:3001/register', {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};

const logIn = (user: User) => {
  fetch('http://localhost:3001/logIn', {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};

const getUser = () => {
  fetch('http://localhost:3001/user', {
    method: 'GET',
    headers,
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => res);
};
export { registerUser, logIn, getUser };
