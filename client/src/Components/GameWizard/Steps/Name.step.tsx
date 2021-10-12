import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  updateName,
  stepForward,
  // stepBackward,
} from '../../../actions/gameWizard.actions';
// import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';

type Inputs = {
  name: string;
  tags: string;
};

export default function Name() {
  const dispatch = useDispatch();
  // const gameWizard = useSelector((state: IRootState) => state.game);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: iGameWizardState) => {
    dispatch(updateName(data));
    dispatch(stepForward());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} id="name" />
      <input {...register('tags', { required: true })} id="tags" />
      <input type="submit" />
    </form>
  );
}
