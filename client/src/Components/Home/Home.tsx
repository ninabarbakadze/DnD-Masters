import { useSelector, useDispatch } from 'react-redux';

import Login from '../Login/Login';
import { IRootState } from '../../reducers';
import { loginAction, updateAction } from '../../actions/user';
import EditableTextComponent from '../EditableDisplayComponent/EditableDisplayComponent';

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user);
  // dispatch updated component value
  const handleComponentDispatch = (value: any) => {
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
      {/* multi type editable input field   testing */}
      <div style={{ width: '300px', margin: '50px' }}>
        {user.name && (
          <div>
            <EditableTextComponent
              action={handleComponentDispatch}
              initialVal={user.name}
              inputType="input"
            />
            <EditableTextComponent
              action={handleComponentDispatch}
              initialVal={user.name}
              inputType="textarea"
            />
            <EditableTextComponent
              action={handleComponentDispatch}
              initialVal={1}
              inputType="number"
            />
            <EditableTextComponent
              action={handleComponentDispatch}
              initialVal="STR"
              inputType="options"
              options={['STR', 'CON', 'DEX', 'INT', 'WIS', 'CHA']}
            />
          </div>
        )}
      </div>
      {user.name && (
      <p>
        {`current Value:   ${user.name}`}
      </p>
      )}
    </div>
  );
}
