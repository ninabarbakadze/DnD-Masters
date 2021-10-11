import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Username" {...register('username')} />
        {!isLogin && <input placeholder="Email" />}
        <input placeholder="Password" {...register('password')} />
        {!isLogin && <input placeholder="Confirm Password" />}
        <input type="submit" value={isLogin ? 'Login' : 'Sign In'} />
      </form>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Not Signed up yet? Sign up' : 'Already Signed up? Login'}
      </button>
    </div>
  );
}
