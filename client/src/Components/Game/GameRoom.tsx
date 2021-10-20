/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { IRootState } from '../../reducers';
// import PlayerJoin from '../JoinGame/PlayerJoin';

const GameRoom = () => {
  const [gameActive, setGameActive] = useState<Boolean>(false);
  return (
    <div>
      <h1>GAME ROOM</h1>
    </div>
  );
};

export default GameRoom;
