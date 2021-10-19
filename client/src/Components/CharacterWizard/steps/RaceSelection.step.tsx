/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { updateRace } from '../../../actions/characterCreationWizard.actions';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterRace } from '../../../interfaces/externalData/externalData.interface';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import Carousel from '../../Carousel/Carousel';
import DetailsCard from '../../DetailsCard/detailsCard.component';
import photos from '../../../assets/racePhotos/racePhotos';
import RaceDetails from '../../raceDetails/raceDetails';

const RaceSelection = ({ path, onSubmit }: iWizardStepProps<iCharacter>) => {
  const [races, setRaces] = useState<iCharacterRace[]>([]);
  const [selectedRace, setSelectedRace] = useState();
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
      setIsLoading(false);
    });
  };

  const createRaceOptions = (races: iCharacterRace[]) => {
    return races.map((race) => {
      return (
        <DetailsCard
          key={JSON.stringify(race)}
          name={race.name}
          imgPath={photos[race.index.replace('-', '')]}
          content={<RaceDetails race={race} />}
        />
      );
    });
  };

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
        type="button"
        onClick={() =>
          onSubmit({ race: selectedRace }, updateRace, handleNextStep())
        }
        disabled={isLoading}
      >
        {selectedRace?.subraces?.length ? `Subrace` : 'Background'}
      </button>
    </div>
  );
};

export default RaceSelection;
