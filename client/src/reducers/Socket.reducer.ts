/* eslint-disable */
import { iAction } from '../interfaces/redux.interface';
import { iSocketReducerState } from '../interfaces/socket.interface'



const initialState: iSocketReducerState = { players: [] };

const socketReducer = (
  state = initialState,
  { type, payload }: iAction<iSocketReducerState>,
):iSocketReducerState => {
  switch (type) {
    case 'CREATE_SOCKET':
      return {
        ...state,
        socket: payload.socket,
      };
    case 'UPDATE_Players':
      return {
        ...state,
        players: payload.players,
      };
    default:
      return state;
  }
};

export default socketReducer;
