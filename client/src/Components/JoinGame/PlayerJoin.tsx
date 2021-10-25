import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { joinGame, updatePlayers } from '../../actions/Socket.action';
import { IRootState } from '../../reducers';
import { getAllCharacter } from '../../services/character.sevices';
import CharacterCard from './CharacterCard';
import photos, { racePhotoKeys } from '../../assets/racePhotos/racePhotos';
import Carousel from '../Carousel/Carousel';
import { iJoinGameCharacter } from '../../interfaces/character.interface';

interface props {
  activateGame: any;
  addPlayer: any;
}

const PlayerJoin = ({ activateGame, addPlayer }: props) => {
  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');
  const [characterRaces, setcharacterRaces] = useState<iJoinGameCharacter[]>([]);
  const [roomCode, setRoomCode] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  function handleClick() {
    dispatch(joinGame(roomCode, playerName));
    addPlayer({ playerName, position: { x: 0, y: 0 } });
    activateGame(true);
  }

  const createRaceOptions = (races: iJoinGameCharacter[]) => (
    races.map((race) => (
      <CharacterCard
        key={JSON.stringify(race.race)}
        name={race.name}
        imgPath={photos[race.race.index.replace('-', '') as racePhotoKeys]}
      />
    ))
  );

  const getAllCharacters = async () => {
    if (user.name) {
      const characters = await getAllCharacter(user.name);
      const arr = characters.map((char) => ({
        race: char.race,
        name: char.name,
      }));
      setcharacterRaces(arr);
    }
  };

  useEffect(() => {
    dispatch(updatePlayers([]));
  }, []);

  useEffect(() => {
    getAllCharacters();
    setDisabled(!(playerName.length && roomCode.length === 5));
  }, [playerName, roomCode]);

  return (
    <div>
      <h1>Join a Game Room</h1>
      <div>
        <label htmlFor="playerName">
          <input
            name="playerName"
            id="playerName"
            type="text"
            required
            onChange={(e) => handleNameChange(e)}
          />
        </label>
        <label htmlFor="roomCode">
          <input
            name="roomCode"
            id="roomCode"
            type="text"
            required
            onChange={(e) => handleCodeChange(e)}
          />
        </label>
      </div>
      {characterRaces.length ? (
        <Carousel show={4}>
          {createRaceOptions(characterRaces)}
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
