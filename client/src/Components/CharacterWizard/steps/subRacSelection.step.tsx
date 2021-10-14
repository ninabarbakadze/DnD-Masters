/* eslint-disable */

import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateRace } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterRace } from '../../../interfaces/externalData.interfaces';
// import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';
import { getAllInList } from '../../../services/externalData.service';
import { raceOptions, raceDataCleanUp } from '../helpers/selectOptions.helper';

type Inputs = {
  race: string;
};

interface iRaceSelectionProps {
  path?: string;
  onSubmit: any;
}

const RaceSelection = ({ path, onSubmit }: iRaceSelectionProps) => {
  const [races, setRaces] = useState<iCharacterRace[]>([]);
  const [raceOptionsList, setRaceListOptions] = useState<JSX.Element[]>([
    <option>...Loading</option>,
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { register, handleSubmit } = useForm<Inputs>();

  const getAllSubRaceOptions = () => {
    getAllInList<iCharacterRace>('subraces').then((results) => {
      setRaces(results);
      setRaceListOptions(raceOptions(results));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllRaceOptions();
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit({ race: raceDataCleanUp(data.race, races) }, updateRace, path);
      })}
    >
      <select
        {...register('race', { required: true })}
        id="race"
        disabled={isLoading}
      >
        {raceOptionsList}
      </select>

      <input type="submit" />
    </form>
  );
};

// RaceSelection.defaultProps = { path: undefined };

export default RaceSelection;
