import { Socket } from 'socket.io-client';
import iPlayerToken from './playerToken.interface';

export interface iSocket extends Socket {
  roomCode?:string;
  player?:string
}

export interface iSocketReducerState {
  socket?: iSocket;
  players: iPlayerToken[]
}
