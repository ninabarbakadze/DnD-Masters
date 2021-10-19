/* eslint-disable */
import { iAction } from '../interfaces/redux.interface';
import { Socket } from 'socket.io-client';

const initialState: { socket?: Socket } = {};

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
    default:
      return state;
  }
};

export default socketReducer;
