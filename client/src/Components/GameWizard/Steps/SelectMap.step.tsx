import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateMap,
  stepForward,
  stepBackward,
} from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';

type Inputs = {
  mapName: string;
  mapTags: string;
};

export default function Name() {
  const dispatch = useDispatch();
  const gameWizard = useSelector((state: IRootState) => state.game);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: iGameWizardState) => {
    dispatch(updateMap(data));
    dispatch(stepForward());
  };

  const handleBack = () => {
    dispatch(stepBackward());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('mapName', { required: true })}
        id="mapName"
        defaultValue={gameWizard.wizardData.mapName}
      />
      <input
        {...register('mapTags', { required: true })}
        id="mapTags"
        defaultValue={gameWizard.wizardData.mapTags}
      />
      <button type="button" onClick={handleBack}>
        Back
      </button>
      <input type="submit" />
      <div>Create new Map</div>
    </form>
  );
}
