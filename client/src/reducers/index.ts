import { combineReducers } from 'redux';
import userReducer from './user';
import gameReducer from './game';

export interface IRootState {
  user: { isLoggedIn: boolean; name: string };
  game: { position: number };
}

const allReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

export default allReducer;
