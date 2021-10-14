import { useSelector, useDispatch } from 'react-redux';

import Login from '../Login/Login';
import { IRootState } from '../../reducers';
import { loginAction, updateAction } from '../../actions';
import EditableTextComponent from '../EditableTextComponent/EditableTextComponent';

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user);
  const handleComponentDispatch = (value: string) => {
    dispatch(updateAction(value));
  };

  return (
    <div>
      <h1>Home</h1>
      <Login />
      <button type="button" onClick={() => dispatch(loginAction('Herbert'))}>
        Switch
      </button>
      {user.isLoggedIn ? <p>Logged In </p> : <p>Logged Out</p>}
      <div style={{ width: '300px' }}>

        {user.name && (
        <EditableTextComponent
          action={handleComponentDispatch}
          initialVal={user.name}
        />
        )}
      </div>
      {user.name && <p>{user.name}</p>}
    </div>
  );
}
