import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateName } from '../../../actions/gameWizard.actions';
import { iCharacterRace } from '../../../interfaces/externalData.interfaces';
// import { IRootState } from '../../../reducers';
import { iGameWizardState } from '../../../reducers/game';
import { getAllInList } from '../../../services/externalData.service';
// import { populateRaces } from '../../../actions/characterCreationWizard.actions';
// import { iCharacterWizardState } from '../../../interfaces/character.interface';

type Inputs = {
  race: string;
};

interface iRaceSelectionProps {
  path?: string;
  onSubmit: any;
}

const RaceSelection = ({ path, onSubmit }: iRaceSelectionProps) => {
  const [races, setRaces] = useState<iCharacterRace[]>();
  // const dispatch = useDispatch();
  // const characterCreation = useSelector(
  //   (state: IRootState) => state.characterCreation,
  // );
  // const characterWizard: iCharacterWizardState = useSelector(
  //   (state: IRootState) => state.characterWizard,
  // );
  const { register, handleSubmit } = useForm<Inputs>();

  const getAllRaceOptions = () => {
    getAllInList<iCharacterRace>('races').then((results) => {
      setRaces(results);
      console.log(races);
      // const state = characterWizard;
      // state.races = races;
      // dispatch(populateRaces(state));
    });
  };

  useEffect(() => getAllRaceOptions(), []);

  return (
    <form
      onSubmit={handleSubmit((data: iGameWizardState) => {
        onSubmit(data, updateName, path);
      })}
    >
      <input {...register('race', { required: true })} id="race" />

      <input type="submit" />
    </form>
  );
};

RaceSelection.defaultProps = { path: undefined };

export default RaceSelection;
