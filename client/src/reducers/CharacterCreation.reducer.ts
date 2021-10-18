import {
  iCharacterWizardState,
  iCharacter,
} from '../interfaces/character.interface';

import { iAction } from '../interfaces/redux.interface';

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
    case 'UPDATE_CLASS':
      return {
        ...state,
        class: payload.class,
      };
    case 'UPDATE_ATTRIBUTES':
      return {
        ...state,
        abilityArray: payload.abilityArray,
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
