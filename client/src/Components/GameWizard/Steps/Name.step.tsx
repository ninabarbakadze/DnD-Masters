import { useSelector } from 'react-redux';
import { useState } from 'react';
import { updateNameAndTag } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';

function Name({ path, onSubmit }: any) {
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const gameWizard = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );

  const handleSubmit = () => {
    console.log(name);
    onSubmit({ name, tags }, updateNameAndTag, path);
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default Name;
