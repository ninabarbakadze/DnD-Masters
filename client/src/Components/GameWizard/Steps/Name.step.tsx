import { useSelector } from 'react-redux';
import { useState } from 'react';
import { updateNameAndTag } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { PayloadAction } from '../../../interfaces/redux.interface';
import { iGameWizardState } from '../../../reducers/gameCreation.reducer';

interface props {
  path: string;
  onSubmit(data: iGameWizardState,
    payLoadAction: PayloadAction<iGameWizardState>,
    path?: string,): void;
}

function Name({ path, onSubmit }: props) {
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const gameWizard = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );

  const handleSubmit = () => {
    onSubmit({ name, tags, playerArr: [] }, updateNameAndTag, path);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        placeholder="Name of the Game"
        id="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        defaultValue={gameWizard.name}
        required
      />
      <input
        value={tags}
        placeholder="Tags"
        id="tags"
        onChange={(e) => {
          setTags(e.target.value);
        }}
        defaultValue={gameWizard.tags}
      />
      <button className="main-button" type="submit">
        Next
      </button>
    </form>
  );
}

export default Name;
