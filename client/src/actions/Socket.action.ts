import { Socket } from 'socket.io-client';
import { PayloadAction } from '../interfaces/redux.interface';

export const updateSocket: PayloadAction<Socket> = (data) => ({
  type: 'CREATE_SOCKET',
  payload: data,
});

export const x = {};
