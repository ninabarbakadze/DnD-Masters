/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { useHistory } from 'react-router-dom';
import { saveCharacter, updateCharacter } from '../../services/character.sevices';

interface IProps{
  username:string,
  // service:any,
  body: any
  set:any
}

export default function ButtonForSaveOrUpdate({
  username, body, set,
}:IProps) {
  const history = useHistory();
  const handleClick = () => {
    history.push('/dashboard');
    if (body.saved) {
      return updateCharacter(username, body._id, body).then((res) => {
        set({ ...res });
      });
    }
    if (!body.saved) {
      set((prevVal:any) => ({ ...prevVal, saved: true }));
      // @ts-ignore
      return saveCharacter(username, body).then((res) => { set((prevVal:any) => ({ ...prevVal, _id: res._id })); });
    }
  };
  return (
    <div>
      <button type="button" onClick={() => { handleClick(); }}>
        {!body.saved ? 'Save' : 'Update'}
      </button>
    </div>
  );
}
