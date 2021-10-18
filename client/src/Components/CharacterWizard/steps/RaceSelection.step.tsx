/* eslint-disable */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateRace } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterRace } from '../../../interfaces/externalData/externalData.interface';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import { dataCleanUp, hasSubraces } from '../helpers/chracterCreation.helpers';
import Options from '../helpers/selectOptions.helper';

type Inputs = {
  race: string;
};

const RaceSelection = ({ path, onSubmit }: iWizardStepProps<iCharacter>) => {
  const [races, setRaces] = useState<iCharacterRace[]>([]);
  const [raceOptionsList, setRaceListOptions] = useState<JSX.Element[]>([
    <option key={0}>...Loading</option>,
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
          const race = dataCleanUp(data.race, races);
          onSubmit({ race }, updateRace, handleNextStep());
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

export default RaceSelection;
