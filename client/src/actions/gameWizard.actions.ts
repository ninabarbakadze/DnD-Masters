import { iGameWizardState } from '../reducers/game.reducer';
import { PayloadAction } from '../interfaces/redux.interface';

export const updateName: PayloadAction<iGameWizardState> = (wizardData) => ({
  type: 'UPDATE_NAME',
  payload: wizardData,
});

export const updateMap: PayloadAction<iGameWizardState> = (wizardData) => ({
  type: 'UPDATE_MAP',
  payload: wizardData,
});
