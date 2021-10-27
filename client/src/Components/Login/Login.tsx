import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import { loginAction } from '../../actions/user.actions';
import {
  registerUser,
  logIn,
} from '../../services/user.services';
import './Login.scss';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (data: object, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      const user = await logIn({ username, password });
      Cookies.set('user', user.username);
      dispatch(loginAction(user.username));
      history.push('/Dashboard');
    } else {
      const user = await registerUser({
        username,
        email,
        password,
      });
      Cookies.set('user', user.username);
      dispatch(loginAction(user.username));
      history.push('/Dashboard');
    }
  };

  const logOut = (): void => {
    Cookies.remove('user');
    window.location.reload();
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit({ username, email, password }, e)}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="Email"
            value={email}
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        )}
        <input
          placeholder="Password"
          type="password"
          value={password}
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {!isLogin && (
          <input
            placeholder="Confirm Password"
            type="password"
            value={passwordConfirm}
            id="password"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
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
