import { withRouter } from 'react-router-dom';

function Invitation({ onSubmit }: any) {
  return (
    <div>
      <p>
        Invitiation Link:
        {Math.random()}
      </p>
      <button type="button" onClick={onSubmit}>
        Start Game
      </button>
    </div>
  );
}

export default withRouter(Invitation);
