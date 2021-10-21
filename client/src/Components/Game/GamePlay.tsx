/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { iCharacter } from '../../interfaces/character.interface';
import { IRootState } from '../../reducers';
import Chat from '../Chat/Chat';
import Dice from '../Dice/Dice';

interface props {
  playerCharacter?: iCharacter;
  // roomCode: 'string';
}

const GamePlay = ({ playerCharacter }: props) => {
  const { socket } = useSelector((state: IRootState) => state.socketReducer);
  const userName = useSelector((state: IRootState) => state.user.name);
  const [gameName, setGameName] = useState<string>('');
  const [userTokens, setUserTokens] = useState([]);

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
          <Chat socket={socket} room={socket.roomCode} username={userName} />
        </div>
      )}
    </div>
  );
};

export default GamePlay;
