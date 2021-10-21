/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { IRootState } from '../../reducers';
import PlayerJoin from '../JoinGame/PlayerJoin';
import GameMap from './GameMap';
import GamePlay from './GamePlay';
import iPlayerToken from '../../interfaces/playerToken.interface';

const GameRoom = () => {
  const [gameActive, setGameActive] = useState<Boolean>(false);
  const [players, setPlayers] = useState<iPlayerToken[]>([]);
  const { socket } = useSelector((state: IRootState) => state.socketReducer);

  function addPlayer(player: iPlayerToken) {
    setPlayers([player]);
  }
  return (
    <div>
      <h1>GAME ROOM</h1>

      {gameActive ? (
        socket ? (
          <div>
            <GamePlay
              players={players}
              setPlayers={setPlayers}
              socket={socket}
            />
            {/* <GameMap /> */}
          </div>
        ) : (
          <h1>...Loading</h1>
        )
      ) : (
        <PlayerJoin activateGame={setGameActive} addPlayer={addPlayer} />
      )}
    </div>
  );
};

export default GameRoom;
