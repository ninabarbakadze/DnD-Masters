import {
  iCharacter,
  iCharacterWizardState,
} from '../interfaces/character.interface';
import { PayloadAction } from '../interfaces/reduxInterfaces';

export const updateRace: PayloadAction<iCharacter> = (characterData) => ({
  type: 'UPDATE_RACE',
  payload: characterData,
});

export const updateSubrace: PayloadAction<iCharacter> = (characterData) => ({
  type: 'UPDATE_SUBRACE',
  payload: characterData,
});

export const populateRaces: PayloadAction<iCharacterWizardState> = (
  wizardState,
) => ({
  type: 'POPULATE_RACES',
  payload: wizardState,
});

export const A = {};
