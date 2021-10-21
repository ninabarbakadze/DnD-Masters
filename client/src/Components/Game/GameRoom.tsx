/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { IRootState } from '../../reducers';
import PlayerJoin from '../JoinGame/PlayerJoin';
import GameMap from './GameMap';
import GamePlay from './GamePlay';
import iPlayerToken from '../../interfaces/playerToken.interface';
import { updatePlayer } from '../../actions/gameWizard.actions';

const GameRoom = () => {
  const dispatch = useDispatch();
  const [gameActive, setGameActive] = useState<Boolean>(false);
  // const [players, setPlayers] = useState<iPlayerToken[]>([]);
  const { socket } = useSelector((state: IRootState) => state.socketReducer);
  const { playerArr } = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );

  function addPlayer(player: iPlayerToken) {
    if (playerArr) {
      dispatch(updatePlayer({ playerArr: [player] }));
    }
  }

  function setPlayers(players: iPlayerToken[]) {
    dispatch(updatePlayer({ playerArr: players }));
  }

  return (
    <div>
      <h1>GAME ROOM</h1>

      {gameActive ? (
        socket && playerArr.length > 0 ? (
          <div>
            <GamePlay
              players={playerArr}
              setPlayers={setPlayers}
              socket={socket}
            />
            <GameMap />
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
