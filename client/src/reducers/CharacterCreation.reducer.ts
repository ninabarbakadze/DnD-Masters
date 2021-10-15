import {
  iCharacterWizardState,
  iCharacter,
} from '../interfaces/character.interface';

import { iAction } from '../interfaces/reduxInterfaces';

const initialState: iCharacter = {};

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
    case 'UPDATE_SUBRACE':
      return {
        ...state,
        subrace: payload.subrace,
      };
    case 'UPDATE_BACKGROUND':
      return {
        ...state,
        background: payload.background,
      };
    default:
      return state;
  }
};

export const characterWizardStateReducer = (
  state: iCharacterWizardState = {},
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
