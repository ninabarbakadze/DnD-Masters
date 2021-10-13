import { combineReducers } from 'redux';
import {
  characterCreationReducer,
  characterWizardStateReducer,
} from './CharacterCreation.reducer';
import userReducer from './user';
import gameReducer, { iGameWizardState } from './game';
import {
  iCharacter,
  iCharacterWizardState,
} from '../interfaces/character.interface';

export interface IRootState {
  user: { isLoggedIn: boolean; name: string };
  game: iGameWizardState;
  characterWizard: iCharacterWizardState;
  characterCreation: iCharacter;
}

const allReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  characterCreationReducer,
  characterWizardStateReducer,
});

export default allReducer;
