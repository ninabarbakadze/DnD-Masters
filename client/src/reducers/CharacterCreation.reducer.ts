import {
  iCharacterWizardState,
  iCharacter,
} from '../interfaces/character.interface';

import { iAction } from '../interfaces/reduxInterfaces';

const initialState = {};

export const characterCreationReducer = (
  state: iCharacter = initialState,
  { type, payload }: iAction<iCharacter>,
) => {
  switch (type) {
    case 'UPDATE_RACE':
      return {
        ...state,
        race: payload.race,
      };
    default:
      return state;
  }
};

export const characterWizardStateReducer = (
  state: iCharacterWizardState = initialState,
  { type, payload }: iAction<iCharacterWizardState>,
) => {
  switch (type) {
    case 'POPULATE_RACES':
      return {
        ...state,
        races: payload.races,
      };
    default:
      return state;
  }
};