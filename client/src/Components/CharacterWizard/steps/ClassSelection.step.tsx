/* eslint-disable */
import { useEffect, useState } from 'react';
import { updateClass } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterClass } from '../../../interfaces/externalData/externalData.interface';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import { dataCleanUp } from '../helpers/chracterCreation.helpers';
import Options from '../helpers/selectOptions.helper';

const fallback = <option key={0}>...Loading</option>;

const ClassSelection = ({ path, onSubmit }: iWizardStepProps<iCharacter>) => {
  const [classes, setClasses] = useState<iCharacterClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<iCharacterClass>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllClasses = () => {
    getAllInList<iCharacterClass>('classes').then((results) => {
      setClasses(results);
      setIsLoading(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(dataCleanUp(e.target.value, classes));
  };

  const handleSubmit = () => {
    onSubmit({ class: selectedClass }, updateClass, path);
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  return (
    <div>
      <h2>Select Character Race</h2>

      <select
        id="class"
        disabled={isLoading}
        onChange={(e) => handleChange(e)}
        value={selectedClass?.name || 'none'}
      >
        {classes.length ? Options(classes) : fallback}
      </select>

      <button
        type="button"
        onClick={() => onSubmit({ class: selectedClass }, updateClass, path)}
      >
        Next
      </button>
    </div>
  );
};

export default ClassSelection;
