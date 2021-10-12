import { withRouter } from 'react-router-dom';

function Invitation({ onWizardComplete }: any) {
  return (
    <div>
      <p>
        Invitiation Link:
        {Math.random()}
      </p>
      <button type="button" onClick={onWizardComplete}>
        Start Game
      </button>
    </div>
  );
}

export default withRouter(Invitation);
