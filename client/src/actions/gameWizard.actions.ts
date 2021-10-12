import { iGameWizardState } from '../reducers/game';
import { PayloadAction } from '../interfaces/reduxInterfaces';

export const updateName: PayloadAction<iGameWizardState> = (wizardData) => ({
  type: 'UPDATE_NAME',
  payload: wizardData,
});

export const updateMap = (wizardData: any) => ({
  type: 'UPDATE_MAP',
  payload: wizardData,
});
