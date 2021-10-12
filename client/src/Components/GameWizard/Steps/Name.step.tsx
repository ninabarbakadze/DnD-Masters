import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateName,
  // stepBackward,
} from '../../../actions/gameWizard.actions';
import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';

type Inputs = {
  name: string;
  tags: string;
};

interface iNameProps {
  onSubmit: any;
  path: string;
}

function Name(props: iNameProps): React.FC<iNameProps> {
  // const dispatch = useDispatch();
  const gameWizard = useSelector((state: IRootState) => state.game);
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: gameWizard.wizardData.name,
      tags: gameWizard.wizardData.tags,
    },
  });

  // const onSubmit = (data: iGameWizardState) => {
  //   dispatch(updateName(data));
  //   history.push('/gameWizard/selectMap');
  // };

  return (
    <form
      onSubmit={handleSubmit((data) => props.onSubmit(data, updateName, path))}
    >
      {console.log(gameWizard)}
      <input {...register('name', { required: true })} id="name" />
      <input {...register('tags', { required: true })} id="tags" />
      <input type="submit" />
    </form>
  );
}

export default withRouter(Name);
