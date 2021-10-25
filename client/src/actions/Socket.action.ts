/* eslint-disable */
import { Socket } from 'socket.io-client';
import { createSocket } from '../services/socket.service';
import appStore from '../stores/appStore';

export const updateSocket = (data: Socket) => ({
  type: 'CREATE_SOCKET',
  payload: data,
});

export const joinGame = (gameRoom: string, player: string) => {
  console.log(gameRoom, player);
  return async (dispatch: any) => {
    if (!appStore.getState().socketReducer.socket) {
      createSocket().then((socket: Socket) => {
        socket.roomCode = gameRoom;
        socket.player = player;
        dispatch(updateSocket(socket));
        socket.emit('join_room', { gameRoom, player });
      });
    } else {
      const { socket:Socket } = appStore.getState().socketReducer;
      socket.roomCode = gameRoom;
      socket.player = player;
      dispatch(updateSocket(socket));
      socket.emit('join_room', { gameRoom, player });
    }
  };
};

export function updatePlayers(players: []) {
  return {
    type: 'UPDATE_PLAYERS',
    playload: players,
  };
}
