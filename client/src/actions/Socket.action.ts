/* eslint-disable */
import { createSocket } from '../services/socket.service';
import appStore from '../stores/appStore';
import iSocket from '../interfaces/socket.interface'

export function updateSocket(socket: iSocket) {
 return  {type: 'CREATE_SOCKET',
  payload: {socket}}
};

export const joinGame = (gameRoom: string, player: string) => {
  console.log(gameRoom, player);
  return async (dispatch: any) => {
    if (!appStore.getState().socketReducer.socket) {
      createSocket().then((socket: iSocket) => {
        socket.roomCode = gameRoom;
        socket.player = player;
        dispatch(updateSocket(socket));
        socket.emit('join_room', { gameRoom, player });
      });
    } else {
      const { socket } = appStore.getState().socketReducer;
      if (socket) {
        socket.roomCode = gameRoom;
        socket.player = player;
        dispatch(updateSocket(socket));
        socket.emit('join_room', { gameRoom, player });
      }
    }
  };
};

export function updatePlayers(players: []) {
  return {
    type: 'UPDATE_PLAYERS',
    playload: {players},
  };
}
