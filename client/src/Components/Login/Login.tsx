import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './Login.scss';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Username" {...register('username')} />
        {!isLogin && <input placeholder="Email" />}
        <input placeholder="Password" {...register('password')} />
        {!isLogin && <input placeholder="Confirm Password" />}
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
    </div>
  );
}
