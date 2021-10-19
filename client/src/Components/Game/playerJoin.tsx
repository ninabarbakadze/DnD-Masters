/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinGame } from '../../actions/Socket.action';
// import { Socket } from 'socket.io-client';
// import { IRootState } from '../../reducers';
import { createSocket } from '../../services/socket.service';

const PlayerJoin = ({ activateGame }: any) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState<string>('');
  const [roomCode, setRoomCode] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  // const socket = useSelector((state: IRootState) => state.socketReducer);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  function handleClick() {
    console.log('clicked');
    dispatch(joinGame(roomCode));
    // createSocket();
    activateGame(true);
    // if (!socket) {
    // const sock = createSocket();

    // sock.emit('join_game', roomCode);
    // console.log(sock);
    // }
    // console.log(socket);
    // socket.emit('join_room', roomCode);
  }

  useEffect(() => {
    setDisabled(!(playerName.length && roomCode.length === 5));
  }, [playerName, roomCode]);

  return (
    <div>
      <h1>Join a Game Room</h1>
      <div>
        <label htmlFor="playerName">Player Name</label>
        <input
          name="playerName"
          id="playerName"
          type="text"
          required
          onChange={(e) => handleNameChange(e)}
        />
        <label htmlFor="roomCode">Room Code</label>
        <input
          name="roomCode"
          id="roomCode"
          type="text"
          required
          onChange={(e) => handleCodeChange(e)}
        />
      </div>
      <button type="button" disabled={disabled} onClick={() => handleClick()}>
        Join Room!
      </button>
    </div>
  );
};
export default PlayerJoin;
