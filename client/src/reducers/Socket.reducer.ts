import { Socket } from 'socket.io-client';
import { iAction } from '../interfaces/redux.interface';

const initialState: { socket?: Socket; players: [] } = { players: [] };

const socketReducer = (
  state = initialState,
  { type, payload }: iAction<Socket>,
) => {
  switch (type) {
    case 'CREATE_SOCKET':
      return {
        ...state,
        socket: payload,
      };
    case 'UPDATE_Players':
      return {
        ...state,
        players: payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
