/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { ICharacterDB } from '../../interfaces/characterFromDB.interface';
import { saveCharacter, updateCharacter } from '../../services/character.services';

interface IProps{
  username:string
  body: ICharacterDB
  set: Dispatch<SetStateAction<ICharacterDB>>
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
      set((prevVal:ICharacterDB) => ({ ...prevVal, saved: true }));
      return saveCharacter(username, body)
        .then((res) => { set((prevVal:ICharacterDB) => ({ ...prevVal, _id: res._id })); });
    }
  };
  return (
    <div>
      <button className="save-character" type="button" onClick={() => { handleClick(); }}>
        {!body.saved ? 'Save' : 'Update'}
      </button>
    </div>
  );
}
