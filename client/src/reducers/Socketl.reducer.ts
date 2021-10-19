/* eslint-disable */
import { iAction } from '../interfaces/redux.interface';
import io, { Socket } from 'socket.io-client';
import { createSocket } from '../services/socket.service';

const initialState = {};

const socketReducer = (
  state = initialState,
  { type, payload }: iAction<any>,
) => {
  switch (type) {
    case 'CREATE_SOCKET':
      const sock = createSocket();
      return {
        ...state,
        socket: sock,
      };
    default:
      return state;
  }
};

export default socketReducer;
