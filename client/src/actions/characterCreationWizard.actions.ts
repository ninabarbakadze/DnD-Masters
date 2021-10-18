import { iCharacter } from '../interfaces/character.interface';
import { PayloadAction } from '../interfaces/redux.interface';

export const updateRace: PayloadAction<iCharacter> = (characterData) => ({
  type: 'UPDATE_RACE',
  payload: characterData,
});

export const updateSubrace: PayloadAction<iCharacter> = (characterData) => ({
  type: 'UPDATE_SUBRACE',
  payload: characterData,
});

export const updateBackground: PayloadAction<iCharacter> = (characterData) => ({
  type: 'UPDATE_BACKGROUND',
  payload: characterData,
});

export const updateAbilityArray: PayloadAction<iCharacter> = (
  characterData,
) => ({
  type: 'UPDATE_ATTRIBUTES',
  payload: characterData,
});
