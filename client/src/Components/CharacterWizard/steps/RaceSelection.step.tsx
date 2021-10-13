import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { updateName } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';

type Inputs = {
  name: string;
  tags: string;
};

function Name({ path, onSubmit }: any) {
  const gameWizard = useSelector((state: IRootState) => state.game);
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <form
      onSubmit={handleSubmit((data: iGameWizardState) => {
        onSubmit(data, updateName, path);
      })}
    >
      <input
        {...register('name', { required: true })}
        id="name"
        defaultValue={gameWizard.name}
      />
      <input
        {...register('tags', { required: true })}
        id="tags"
        defaultValue={gameWizard.tags}
      />
      <input type="submit" />
    </form>
  );
}

export default Name;
