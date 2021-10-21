import './WizardNav.scss';

export default function WizardNav({ history }: any) {
  return (
    <div className="wizard-nav">
      <button type="button" onClick={() => history.push('/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
}
