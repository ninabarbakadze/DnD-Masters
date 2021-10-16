import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { loginAction } from '../../actions/user.actions';
import { registerUser, logIn, getUser } from '../../services/user.services';
import './Login.scss';

type Inputs = {
  username: string;
  password: string;
  email: string;
  passwordConfirm?: string;
};

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLogin) {
      await logIn({ username: data.username, password: data.password });
      const user = await getUser();
      Cookies.set('user', user.username);
      dispatch(loginAction(user.username));
    } else {
      registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
    }
  };

  const logOut = (): void => {
    Cookies.remove('user');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Username"
          {...register('username', { required: true })}
        />
        {errors.username?.type === 'required' && 'Username must be filled out'}
        {!isLogin && (
          <input
            placeholder="Email"
            {...register('email', { required: true })}
          />
        )}
        <input
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password?.type === 'required' && 'Password must be filled out'}
        {!isLogin && (
          <input
            placeholder="Confirm Password"
            {...register('passwordConfirm', { required: true })}
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
