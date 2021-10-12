interface User {
  username: string;
  email?: string;
  password: string;
}

const registerUser = (user: User) => {
  console.log(user);
  fetch('http://localhost:3002/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(user),
  }).then((res) => res.json())
    .then((res) => console.log(res));
};

const logIn = (user: User) => {
  fetch('http://localhost:3002/logIn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(user),
  }).then((res) => res.json())
    .then((res) => console.log(res));
};

const getUser = () => {
  fetch('http://localhost:3002/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }).then((res) => res.json())
    .then((res) => res);
};

export { registerUser, logIn, getUser };
