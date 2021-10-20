/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
// @ts-nocheck
import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { joinGame } from '../../actions/Socket.action';
import { IRootState } from '../../reducers';
import { getAllCharacter } from '../../services/character.sevices';
import CharacterWizard from '../CharacterWizard/CharacterWizard';

const PlayerJoin = ({ activateGame }: any) => {
  const user = useSelector((state: IRootState) => state.user);
  console.log('player join', user);
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [charactersArr, setCharactersArr] = useState([]);
  console.log(charactersArr);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  function handleClick() {
    console.log('clicked');
    dispatch(joinGame(roomCode));
    activateGame(true);
  }

  const getCharacters = async () => {
    if (user.name) {
      const characters = getAllCharacter(user.name);
      setCharactersArr(characters);
    }
  };

  useEffect(() => {
    getCharacters();
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
      <button type="submit">Choose Character</button>
      <Link to="/characterWizard/raceSelection">
        <button type="submit">Create Character</button>
      </Link>
      <button type="button" disabled={disabled} onClick={() => handleClick()}>
        Join Room!
      </button>
    </div>
  );
};
export default PlayerJoin;
