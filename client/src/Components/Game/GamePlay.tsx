/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable */
// @ts-nocheck
import { useEffect, useState, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { iCharacter } from '../../interfaces/character.interface';
import { updateMap } from '../../actions/gameWizard.actions';
// import { IRootState } from '../../reducers';
import { Socket } from 'socket.io-client';
import iPlayerToken from '../../interfaces/playerToken.interface';
import Chat from '../Chat/Chat';
import Dice from '../Dice/Dice';

interface props {
  playerCharacter?: iCharacter;
  socket: Socket;
  players: iPlayerToken[];
  setPlayers: any;
  mapUrl: string | undefined;
  // roomCode: 'string';
}

const GamePlay = ({
  playerCharacter,
  players,
  setPlayers,
  socket,
  mapUrl,
}: props) => {
  const dispatch = useDispatch();
  // const userName = useSelector((state: IRootState) => state.user.name);
  const [gameName, setGameName] = useState<string>('');
  const [gameJoined, setGameJoined] = useState<boolean>(false);
  const [socketUpdate, setSocketUpdate] = useState<boolean>(false);

  useEffect(() => {
    socket.emit(
      'new_player',
      { player: players[0], room: socket.roomCode },
      (inRoom) => {
        setPlayers(inRoom);
      },
    );
    mapUrl
      ? socket.emit('send_map', mapUrl)
      : socket.emit('request_map', '', (url) =>
          dispatch(updateMap({ mapUrl: url })),
        );
  }, []);

  useEffect(() => {
    if (!socketUpdate)
      socket.emit('update_players', { players, room: socket.roomCode });
  }, [players]);

  useEffect(() => {
    socket.on('update_players', (players) => {
      setSocketUpdate(true);
      setPlayers(players);
      setSocketUpdate(false);
    });
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
      <button
        onClick={() => {
          const newPlayers = [...players];
          newPlayers[0].position.x += 5;
          setPlayers(newPlayers);
        }}
      >
        {JSON.stringify(players)}
      </button>
    </div>
  );
};

export default GamePlay;
