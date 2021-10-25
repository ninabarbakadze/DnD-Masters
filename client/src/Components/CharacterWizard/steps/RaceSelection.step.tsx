/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { updateRace } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterRace } from '../../../interfaces/externalData/externalData.interface';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import Carousel from '../../Carousel/Carousel';
import DetailsCard from '../../DetailsCard/detailsCard.component';
import photos, { racePhotoKeys } from '../../../assets/racePhotos/racePhotos';
import RaceDetails from '../../DetailsCard/raceDetails/raceDetails';

const RaceSelection = ({ path, onSubmit }: iWizardStepProps<iCharacter>) => {
  const [races, setRaces] = useState<iCharacterRace[]>([]);
  const [selectedRace, setSelectedRace] = useState<iCharacterRace>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleNextStep = () => {
    return selectedRace?.subraces?.length
      ? '/characterWizard/subRaceSelection'
      : path;
  };

  const getAllRaceOptions = () => {
    getAllInList<iCharacterRace>('races').then((results) => {
      setRaces(results);
      setSelectedRace(results[0]);
      setIsLoading(false);
    });
  };

  const createRaceOptions = (raceOptions: iCharacterRace[]) => {
    return raceOptions.map((race) => {
      const key: racePhotoKeys = race.index.replace('-', '') as racePhotoKeys;
      return (
        <DetailsCard
          key={key}
          name={race.name}
          imgPath={getProperty(photos, key)}
          content={<RaceDetails race={race} />}
        />
      );
    });
  };

  function handleClick() {
    onSubmit({ race: selectedRace }, updateRace, handleNextStep());
  }

  useEffect(() => {
    getAllRaceOptions();
  }, []);

  useEffect(() => {
    setSelectedRace(races[selectedIndex]);
  }, [races, selectedIndex]);

  return (
    <div>
      <h2 className="text-2xl">Select Character Race</h2>
      {races.length ? (
        <Carousel setIndex={setSelectedIndex} show={1}>
          {createRaceOptions(races)}
        </Carousel>
      ) : (
        <h2>...Loading</h2>
      )}
      <button
        className="main-button"
        type="button"
        onClick={() => handleClick()}
        disabled={isLoading}
      >
        {selectedRace?.subraces?.length ? 'Subrace' : 'Background'}
      </button>
    </div>
  );
};

export default RaceSelection;
