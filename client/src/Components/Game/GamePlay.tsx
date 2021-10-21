/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable */
// @ts-nocheck
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
// import { useSelector } from 'react-redux';
import { iCharacter } from '../../interfaces/character.interface';
// import { IRootState } from '../../reducers';
import { Socket } from 'socket.io-client';
import iPlayerToken from '../../interfaces/playerToken.interface';
import Chat from '../Chat/Chat';
import Dice from '../Dice/Dice';

interface props {
  playerCharacter?: iCharacter;
  socket: Socket;
  players: iPlayerToken[];
  setPlayers: Dispatch<SetStateAction<iPlayerToken[]>>;
  // roomCode: 'string';
}

const GamePlay = ({ playerCharacter, players, setPlayers, socket }: props) => {
  // const userName = useSelector((state: IRootState) => state.user.name);
  const [gameName, setGameName] = useState<string>('');
  const [gameJoined, setGameJoined] = useState<boolean>(false);
  const [PlayersUpdating, setPlayersUpdating] = useState<boolean>(false);

  useEffect(() => {
    socket.emit('new_player', players[0], (inRoom) => {
      console.log(inRoom);
      setPlayersUpdating(true);
      setPlayers(inRoom);
      setGameJoined(true);
      setPlayersUpdating(false);
    });
  }, []);

  useEffect(() => {});

  useEffect(() => {
    console.log('wee');
    if (socket) {
      socket.on('add_player', (data: any) => console.log('event fired', data));
    }
  }, [socket]);

  return (
    <div>
      <header>{gameName}</header>
      <div>
        <Dice />
      </div>
      {socket?.roomCode && (
        <div>
          <Chat
            socket={socket}
            room={socket.roomCode}
            username={socket.playerName}
          />
        </div>
      )}
    </div>
  );
};

export default GamePlay;
