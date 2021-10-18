import { useSelector, useDispatch } from 'react-redux';

import Login from '../Login/Login';
import { IRootState } from '../../reducers';
import { loginAction } from '../../actions/user.actions';

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
      {}
      {user.name && (
      <p>{user.name}</p>
      )}
    </div>
  );
}
