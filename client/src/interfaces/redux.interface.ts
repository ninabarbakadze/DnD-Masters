import { Socket } from 'socket.io-client';

export type iAction<T> = {
  type: string;
  payload: T;
};

export type PayloadAction<T> = (payload: T) => iAction<typeof payload>;

export interface iJoinRoomProps {
  gameRoom: string;
  socket?: Socket;
}
