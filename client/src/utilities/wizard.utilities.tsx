import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  // iWizardStepSubmitArgs,
  wizardStepOnSubmit,
} from '../interfaces/wizard.interface';

export function useWizardStepComplete<T>(onWizardComplete: () => void) {
  const dispatch = useDispatch();
  const history = useHistory();
  const onWizardStepSubmit: wizardStepOnSubmit<T> = (
    data,
    action,
    path,
  ): void => {
    dispatch(action(data));
    if (path) history.push(path);
    else {
      onWizardComplete();
    }
  };
  return onWizardStepSubmit;
}

export const x = {};
