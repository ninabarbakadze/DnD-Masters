/* eslint-disable */
import { iCharacterRace } from '../../../interfaces/externalData/externalData.interface';

export function dataCleanUp<T extends { name: string }>(
  dataName: string,
  data: T[],
): T {
  return data.filter((item) => item.name == dataName)[0];
}

export const hasSubraces = (raceName: string, races: iCharacterRace[]) => {
  const selectedRace = dataCleanUp(raceName, races);
  return selectedRace.subraces.length > 0;
};
