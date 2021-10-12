import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateName } from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';

function Name(props: any) {
  const dispatch = useDispatch();
  const gameWizard = useSelector((state: IRootState) => state.game);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: iGameWizardState) => {
    dispatch(updateName(data));
    props.history.push('/gameWizard/step2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default withRouter(Name);
