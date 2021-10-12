import { combineReducers } from 'redux';
import userReducer from './user';
import gameReducer, { iGameWizardState } from './game';

export interface IRootState {
  user: { isLoggedIn: boolean; name: string };
  game: iGameWizardState;
}

const allReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

export default allReducer;
