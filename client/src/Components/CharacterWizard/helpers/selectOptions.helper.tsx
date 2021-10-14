/* eslint-disable */
import { iCharacterRace } from '../../../interfaces/externalData.interfaces';

export const raceOptions = (races: iCharacterRace[]) => {
  const rOptions = races.map((race) => {
    return (
      <option aria-label={race.index} key={race.index} value={race.name}>
        {race.name}
      </option>
    );
  });
  return rOptions;
};

export const raceDataCleanUp = (
  raceName: string,
  races: iCharacterRace[],
): iCharacterRace => {
  return races.filter((race) => race.name == raceName)[0];
};
