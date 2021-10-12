import { useDispatch } from 'react-redux';
import { stepBackward } from '../../../actions/gameWizard.actions';

export default function Invitation() {
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(stepBackward());
  };

  return (
    <div>
      <p>
        Invitiation Link:
        {Math.random()}
      </p>
      <button type="button" onClick={handleBack}>
        Back
      </button>
      <button type="button">Start Game</button>
    </div>
  );
}
