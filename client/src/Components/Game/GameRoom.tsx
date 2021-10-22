/* eslint-disable  */
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
  const { socket } = useSelector((state: IRootState) => state.socketReducer);
  const { playerArr, mapUrl } = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );

  function addPlayer(player: iPlayerToken) {
    if (playerArr) {
      dispatch(updatePlayer({ playerArr: [...playerArr, player] }));
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
              mapUrl={mapUrl}
              setPlayers={setPlayers}
              socket={socket}
            />
            {mapUrl && <GameMap mapUrl={mapUrl} playerArr={playerArr} />}
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
