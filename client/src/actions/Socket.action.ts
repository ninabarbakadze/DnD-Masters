/* eslint-disable */
// @ts-nocheck
import { Socket } from 'socket.io-client';
// import { iJoinRoomProps } from '../interfaces/redux.interface';
import { createSocket } from '../services/socket.service';
import appStore from '../stores/appStore';

export const updateSocket = (data: Socket) => ({
  type: 'CREATE_SOCKET',
  payload: data,
});

export const joinGame = (gameRoom: string) => {
  return async (dispatch: any) => {
    if (!appStore.getState().socketReducer.socket) {
      createSocket().then((socket: Socket) => {
        console.log('at creation', socket);
        socket.roomCode = gameRoom;
        dispatch(updateSocket(socket));
        socket.emit('join_room', gameRoom);
      });
    } else {
      const { socket } = appStore.getState().socketReducer;
      console.log('after getting from store', socket);
      socket.roomCode = gameRoom;
      dispatch(updateSocket(socket));
      socket.emit('join_room', gameRoom);
    }
  };
};
