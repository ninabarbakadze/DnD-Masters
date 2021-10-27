import './WizardNav.scss';
import { RouteComponentProps } from 'react-router';

interface props {
  history: RouteComponentProps['history'];
}

export default function WizardNav({ history }: props) {
  return (
    <div className="wizard-nav">
      <button type="button" onClick={() => history.push('/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
}
