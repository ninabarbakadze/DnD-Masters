/* eslint-disable */

import { useCallback, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateRace } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterRace } from '../../../interfaces/externalData.interfaces';
// import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';
import { getAllInList } from '../../../services/externalData.service';
import { DataCleanUp, hasSubraces } from '../helpers/chracterCreation.helpers';
import Options from '../helpers/selectOptions.helper';

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
  const { register, handleSubmit, getValues } = useForm<Inputs>();

  const handleNextStep = () => {
    console.log('handling step');
    const x = hasSubraces(getValues('race'), races);
    console.log('hassubRace', x);
    return x ? '/characterWizard/subRaceSelection' : path;
  };

  const getAllRaceOptions = () => {
    getAllInList<iCharacterRace>('races').then((results) => {
      setRaces(results);
      setRaceListOptions(Options(results));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllRaceOptions();
  }, []);

  return (
    <div>
      <h2>Select Character Race</h2>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(
            { race: DataCleanUp(data.race, races) },
            updateRace,
            handleNextStep(),
          );
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
    </div>
  );
};

// RaceSelection.defaultProps = { path: undefined };

export default RaceSelection;
