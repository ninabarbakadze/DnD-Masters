import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { updateName } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';

type Inputs = {
  race: string;
};

interface iRaceSelectionProps {
  path?: string;
  onSubmit: any;
}

function RaceSelection({ path, onSubmit }: iRaceSelectionProps) {
  const gameWizard = useSelector((state: IRootState) => state.game);
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <form
      onSubmit={handleSubmit((data: iGameWizardState) => {
        onSubmit(data, updateName, path);
      })}
    >
      <input
        {...register('race', { required: true })}
        id="name"
        defaultValue={gameWizard.name}
      />
      <input type="submit" />
    </form>
  );
}

RaceSelection.defaultProps = { path: undefined };

export default RaceSelection;
