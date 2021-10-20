import { iGameWizardState } from '../reducers/gameCreation.reducer';
import { PayloadAction } from '../interfaces/redux.interface';

export const updateNameAndTag: PayloadAction<iGameWizardState> = (
  wizardData,
) => ({
  type: 'UPDATE_NAME_AND_TAG',
  payload: wizardData,
});

export const updateMap: PayloadAction<iGameWizardState> = (wizardData) => ({
  type: 'UPDATE_MAP',
  payload: wizardData,
});
