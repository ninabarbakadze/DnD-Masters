interface User {
  username: string;
  email?: string;
  password: string;
}

const headers = new Headers({ 'Content-Type': 'application/json' });

<<<<<<< HEAD
const registerUser = (user: User) => {
  console.log(user);
=======
const registerUser = (user: User) => (
>>>>>>> ab08ef741af5c87a8421c61957e5218ed8ba0219
  fetch('http://localhost:3001/register', {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(user),
<<<<<<< HEAD
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};

const logIn = (user: User) => {
=======
  }).then((res) => res.json())
    .then((res) => res)
);

const logIn = (user: User) => (
>>>>>>> ab08ef741af5c87a8421c61957e5218ed8ba0219
  fetch('http://localhost:3001/logIn', {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(user),
<<<<<<< HEAD
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};

const getUser = () => {
=======
  }).then((res) => res.json())
    .then((res) => res)
);

const getUser = () => (
>>>>>>> ab08ef741af5c87a8421c61957e5218ed8ba0219
  fetch('http://localhost:3001/user', {
    method: 'GET',
    headers,
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => res);
};
export { registerUser, logIn, getUser };
