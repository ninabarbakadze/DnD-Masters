import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateMap } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game.reducer';

type Inputs = {
  mapName: string;
  mapTags: string;
};

function SelectMap({ onSubmit, path }: any) {
  const gameWizard = useSelector((state: IRootState) => state.game);
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <form
      onSubmit={handleSubmit((data: iGameWizardState) => {
        onSubmit(data, updateMap, path);
      })}
    >
      <input
        {...register('mapName', { required: true })}
        id="mapName"
        defaultValue={gameWizard.mapName}
      />
      <input
        {...register('mapTags', { required: true })}
        id="mapTags"
        defaultValue={gameWizard.mapTags}
      />
      <input type="submit" />
      <div>Create new Map</div>
    </form>
  );
}

export default withRouter(SelectMap);
