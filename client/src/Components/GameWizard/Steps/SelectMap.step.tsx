import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateMap } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';

type Inputs = {
  mapName: string;
  mapTags: string;
};

function SelectMap(props: any) {
  const dispatch = useDispatch();
  const gameWizard = useSelector((state: IRootState) => state.game);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: iGameWizardState) => {
    dispatch(updateMap(data));
    props.history.push('/gameWizard/Step3');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
