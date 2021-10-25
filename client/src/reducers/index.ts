import { combineReducers } from 'redux';
import {
  characterCreationReducer,
  characterWizardStateReducer,
} from './CharacterCreation.reducer';
import socketReducer from './Socket.reducer';
import userReducer from './user.reducer';
import gameCreationReducer, { iGameWizardState } from './gameCreation.reducer';
import {
  iCharacter,
  iCharacterWizardState,
} from '../interfaces/character.interface';
import mapCreationReducer from './mapCreation.reducer';
import { iMap } from '../interfaces/map.interface';
import iSocket from '../interfaces/socket.interface';

// mapCreationReducer: any;
// interface prop name and reducer name must be an EXACT MATCH
export interface IRootState {
  user: { isLoggedIn: boolean; name: string };
  gameCreationReducer: iGameWizardState;
  characterWizardStateReducer: iCharacterWizardState;
  characterCreationReducer: iCharacter;
  mapCreationReducer: iMap;
  socketReducer: { socket?: iSocket; players: [] };
}

const allReducer = combineReducers({
  user: userReducer,
  gameCreationReducer,
  characterCreationReducer,
  characterWizardStateReducer,
  mapCreationReducer,
  socketReducer,
});

export default allReducer;
