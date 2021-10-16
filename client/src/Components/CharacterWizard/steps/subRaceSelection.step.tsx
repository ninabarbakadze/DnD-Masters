/* eslint-disable */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { updateSubrace } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/externalData interfaces/character.interface';
import { iCharacterSubrace } from '../../../interfaces/externalData interfaces/externalData.interfaces';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { IRootState } from '../../../reducers';

import { getAllInList } from '../../../services/externalData.service';
import { dataCleanUp } from '../helpers/chracterCreation.helpers';
import Options from '../helpers/selectOptions.helper';

type Inputs = {
  subrace: string;
};

const SubRaceSelection = ({ path, onSubmit }: iWizardStepProps<iCharacter>) => {
  const [subraces, setSubraces] = useState<iCharacterSubrace[]>([]);
  const [optionsList, setOptionsList] = useState<JSX.Element[]>([
    <option key={0}>...Loading</option>,
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
            { subrace: dataCleanUp(data.subrace, subraces) },
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

export default SubRaceSelection;
