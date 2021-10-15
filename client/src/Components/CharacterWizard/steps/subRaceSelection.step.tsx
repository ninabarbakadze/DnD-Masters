/* eslint-disable */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { updateSubrace } from '../../../actions/characterCreationWizard.actions';
import { iCharacterSubrace } from '../../../interfaces/externalData.interfaces';
import { IRootState } from '../../../reducers';

import { getAllInList } from '../../../services/externalData.service';
import { DataCleanUp } from '../helpers/chracterCreation.helpers';
import Options from '../helpers/selectOptions.helper';

type Inputs = {
  subrace: string;
};

interface iSubRaceSelectionProps {
  path?: string;
  onSubmit: any;
}

const SubRaceSelection = ({ path, onSubmit }: iSubRaceSelectionProps) => {
  const [subraces, setSubraces] = useState<iCharacterSubrace[]>([]);
  const [optionsList, setOptionsList] = useState<JSX.Element[]>([
    <option>...Loading</option>,
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { register, handleSubmit } = useForm<Inputs>();
  const character = useSelector(
    (state: IRootState) => state.characterCreationReducer,
  );

  const getAllSubRaceOptions = () => {
    getAllInList<iCharacterSubrace>('subraces', character?.race?.subraces).then(
      (results) => {
        setSubraces(results);
        setOptionsList(Options(results));
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    getAllSubRaceOptions();
  }, []);

  return (
    <div>
      <h2>Select Subrace</h2>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(
            { subrace: DataCleanUp(data.subrace, subraces) },
            updateSubrace,
            path,
          );
        })}
      >
        <select
          {...register('subrace', { required: true })}
          id="subrace"
          name="subrace"
          disabled={isLoading}
        >
          {optionsList}
        </select>

        <input type="submit" />
      </form>
    </div>
  );
};

// RaceSelection.defaultProps = { path: undefined };

export default SubRaceSelection;
