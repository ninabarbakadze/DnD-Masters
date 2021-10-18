/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { updateRace } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterRace } from '../../../interfaces/externalData/externalData.interface';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import { dataCleanUp, hasSubraces } from '../helpers/chracterCreation.helpers';
import Carousel from '../../Carousel/Carousel';
import DetailsCard from '../../DetailsCard/detailsCard.component';
import photos from '../../../assets/racePhotos/racePhotos';

const RaceSelection = ({ path, onSubmit }: iWizardStepProps<iCharacter>) => {
  const [races, setRaces] = useState<iCharacterRace[]>([]);
  const [selectedRace, setSelectedRace] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleNextStep = () => {
    console.log('handling step');
    const x = hasSubraces(getValues('race'), races);
    console.log('hassubRace', x);
    return x ? '/characterWizard/subRaceSelection' : path;
  };

  const getAllRaceOptions = () => {
    getAllInList<iCharacterRace>('races').then((results) => {
      setRaces(results);
      setIsLoading(false);
    });
  };
  const handleSubmit = () => {
    const race = dataCleanUp(selectedRace, races);
    onSubmit({ race }, updateRace, handleNextStep());
  };

  const createRaceOptions = (races: iCharacterRace[]) => {
    return races.map((race) => {
      return (
        <DetailsCard
          key={JSON.stringify(race)}
          name={race.name}
          imgPath={photos[race.index.replace('-', '')]}
        />
      );
    });
  };

  useEffect(() => {
    getAllRaceOptions();
  }, []);

  useEffect(() => {
    setSelectedRace(races[selectedIndex]);
    console.log();
  }, [races, selectedIndex]);

  return (
    <div>
      <h2>Select Character Race</h2>
      {races.length ? (
        <Carousel setIndex={setSelectedIndex} show={1}>
          {createRaceOptions(races)}
        </Carousel>
      ) : (
        <h2>...Loading</h2>
      )}
      <button type="button" onClick={() => handleSubmit()} disabled={isLoading}>
        {selectedRace?.subraces?.length ? `Subrace` : 'Class'}
      </button>
    </div>
  );
};

export default RaceSelection;
