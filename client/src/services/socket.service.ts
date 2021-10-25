import io, { Socket } from 'socket.io-client';

export function joinGame(socket:Socket, roomCode: string) {
  socket.emit('join_room', roomCode);
}

export async function createSocket() {
  return io(`${process.env.REACT_APP_SERVER_URL}`);
}

export const x = {};
