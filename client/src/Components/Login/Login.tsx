import { useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import { loginAction } from '../../actions/user.actions';
import { registerUser, logIn /* getUser */ } from '../../services/user.services';
import './Login.scss';

<<<<<<< HEAD
type Inputs = {
  username: string;
  password: string;
  email: string;
  passwordConfirm?: string;
};

export default function Login() {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
=======
/* eslint-disable
 */export default function Login() {
>>>>>>> ab08ef741af5c87a8421c61957e5218ed8ba0219
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();


<<<<<<< HEAD
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLogin) {
      await logIn({ username: data.username, password: data.password });
      const user = await getUser();
      // @ts-expect-error
      Cookies.set('user', user.username);
      // @ts-expect-error
      dispatch(loginAction(user.username));
    } else {
      registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
=======
  const handleSubmit = async (data: object, e: MouseEvent) => {
    e.preventDefault()
      if (isLogin) {
        const user = await logIn({ username, password });
        console.log(user);
        Cookies.set('user', user.username);
        dispatch(loginAction(user.username));
        history.push('/Dashboard')
      } else {
        await registerUser({
          username,
          email,
          password,
        });
>>>>>>> ab08ef741af5c87a8421c61957e5218ed8ba0219
    }
  };

  const logOut = (): void => {
    Cookies.remove('user');
    window.location.reload();
  };

  return (
    <div className="form-container">
      {/* @ts-ignore */}
      <form onSubmit={(e) => handleSubmit({ username, email, password }, e)}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          id="username"
          onChange={(e) => { setUsername(e.target.value); }}
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="Email"
            value={email}
            id="email"
            onChange={(e) => { setEmail(e.target.value); }}
          />
        )}
        <input
          placeholder="Password"
          type="password"
          value={password}
          id="password"
          onChange={(e) => { setPassword(e.target.value); }}
        />
        {!isLogin && (
          <input
            placeholder="Confirm Password"
            type="password"
            value={passwordConfirm}
            id="password"
            onChange={(e) => { setPasswordConfirm(e.target.value); }}
          />
        )}
        <button className="submit-btn" type="submit">
          {isLogin ? 'Login' : 'Sign In'}
        </button>
      </form>
      <button
        className="link-btn"
        type="button"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Not Signed up yet? Sign up' : 'Already Signed up? Login'}
      </button>
      <button type="button" onClick={() => logOut()}>
        log out
      </button>
    </div>
  );
}
