/* eslint-disable */
import { useEffect, useState } from 'react';
import { updateClass } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterClass } from '../../../interfaces/externalData/externalData.interface';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import Carousel from '../../Carousel/Carousel';
import photos, {
  classPhotoKeys,
} from '../../../assets/classPhotos/classPhotos';
import DetailsCard from '../../DetailsCard/detailsCard.component';
import ClassDetails from '../../DetailsCard/classDetails/classDetails';

const ClassSelection = ({ path, onSubmit }: iWizardStepProps<iCharacter>) => {
  const [classes, setClasses] = useState<iCharacterClass[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState<iCharacterClass>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllClasses = () => {
    getAllInList<iCharacterClass>('classes').then((results) => {
      setClasses(results);
      setIsLoading(false);
    });
  };

  const createOptions = (classes: iCharacterClass[]) => {
    return classes.map((item) => {
      const key: classPhotoKeys = item.index.replace('-', '') as classPhotoKeys;
      return (
        <DetailsCard
          key={key}
          name={item.name}
          imgPath={photos[key]}
          content={<ClassDetails CLASS={item} />}
        />
      );
    });
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  useEffect(() => {
    setSelectedClass(classes[selectedIndex]);
  }, [classes, selectedClass]);

  return (
    <div>
      <h2>Select Class</h2>
      {classes.length ? (
        <Carousel setIndex={setSelectedIndex} show={1}>
          {createOptions(classes)}
        </Carousel>
      ) : (
        <h2>...Loading</h2>
      )}
      <button
        className="main-button"
        type="button"
        onClick={() => onSubmit({ class: selectedClass }, updateClass, path)}
        disabled={isLoading}
      >
        Attributes
      </button>
    </div>
  );
};

export default ClassSelection;
