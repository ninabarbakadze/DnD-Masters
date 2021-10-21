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
import CharacterCard from './CharacterCard';
import photos from '../../assets/racePhotos/racePhotos';
import Carousel from '../Carousel/Carousel';

interface props {
  activateGame: any;
}

const PlayerJoin = ({ activateGame }: props) => {
  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');
  const [charraces, setCharRaces] = useState([]);
  const [roomCode, setRoomCode] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [charactersArr, setCharactersArr] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log('characters array', charactersArr);
  console.log('character races', charraces);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  function handleClick() {
    dispatch(joinGame({ roomCode, playerName }));
    activateGame(true);
  }

  const createRaceOptions = (races) => {
    return races.map((race) => {
      return (
        <CharacterCard
          key={JSON.stringify(race.race)}
          name={race.name}
          imgPath={photos[race.race.index.replace('-', '')]}
        />
      );
    });
  };

  const getAllCharacters = async () => {
    if (user.name) {
      const characters = await getAllCharacter(user.name);
      setCharactersArr(characters);
      const arr = characters.map((char) => ({
        race: char.race,
        name: char.name,
      }));
      setCharRaces(arr);
    }
  };

  useEffect(() => {
    getAllCharacters();
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
      {charraces.length ? (
        <Carousel setIndex={setSelectedIndex} show={4}>
          {createRaceOptions(charraces)}
        </Carousel>
      ) : (
        <h2>...Loading</h2>
      )}
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
