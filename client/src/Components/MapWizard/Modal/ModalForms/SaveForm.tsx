import { SyntheticEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../reducers';

interface props {
  onModalSubmit(name: string): void;
  setModalIsActive(arg: boolean): void;
}

const SaveForm = ({ onModalSubmit, setModalIsActive }: props) => {
  const [name, setName] = useState('');
  const { mapName } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setModalIsActive(false);
    onModalSubmit(name);
    setName('');
  };

  useEffect(() => {
    if (mapName) {
      setName(mapName);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <input
        className="main-button success-button"
        type="submit"
        value="Save"
      />
    </form>
  );
};

export default SaveForm;
