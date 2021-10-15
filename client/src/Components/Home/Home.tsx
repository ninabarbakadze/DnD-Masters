import { useSelector, useDispatch } from 'react-redux';

import Login from '../Login/Login';
import { IRootState } from '../../reducers';
import { loginAction } from '../../actions/user';

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user);

  return (
    <div>
      <h1>Home</h1>
      <Login />
      <button type="button" onClick={() => dispatch(loginAction('Herbert'))}>
        Switch
      </button>
      {user.isLoggedIn ? <p>Logged In </p> : <p>Logged Out</p>}
      {user.name && (
      <p>{user.name}</p>
      )}
    </div>
  );
}
