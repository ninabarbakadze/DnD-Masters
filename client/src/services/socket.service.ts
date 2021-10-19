// @ts-nocheck
import io from 'socket.io-client';

export function joinGame(socket, roomCode: string) {
  socket.emit('join_room', roomCode);
}

export function createSocket() {
  console.log('this is happening');
  const socket = io.connect(process.env.REACT_APP_SERVER_URL);
  console.log('socket is in the service', socket);
  return socket;
}

export const x = {};
