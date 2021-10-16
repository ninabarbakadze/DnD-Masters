import { combineReducers } from 'redux';
import {
  characterCreationReducer,
  characterWizardStateReducer,
} from './CharacterCreation.reducer';
import userReducer from './user.reducer';
import gameReducer, { iGameWizardState } from './game.reducer';
import {
  iCharacter,
  iCharacterWizardState,
} from '../interfaces/character.interface';

// interface prop name and reducer name must be an EXACT MATCH
export interface IRootState {
  user: { isLoggedIn: boolean; name: string };
  game: iGameWizardState;
  characterWizardStateReducer: iCharacterWizardState;
  characterCreationReducer: iCharacter;
}

const allReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  characterCreationReducer,
  characterWizardStateReducer,
});

export default allReducer;
