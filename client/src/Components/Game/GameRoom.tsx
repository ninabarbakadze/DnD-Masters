/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import PlayerJoin from './playerJoin';

const GameRoom = () => {
  return (
    <div>
      <h1>GAME ROOM</h1>
      <PlayerJoin />
    </div>
  );
};

export default GameRoom;
