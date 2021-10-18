/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { updateClass } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterClass } from '../../../interfaces/externalData/externalData.interface';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import Carousel from '../../Carousel/Carousel';
import photos from '../../../assets/classPhotos/classPhotos';
import DetailsCard from '../../DetailsCard/detailsCard.component';

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
      return (
        <DetailsCard
          key={JSON.stringify(item)}
          name={item.name}
          imgPath={photos[item.index.replace('-', '')]}
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