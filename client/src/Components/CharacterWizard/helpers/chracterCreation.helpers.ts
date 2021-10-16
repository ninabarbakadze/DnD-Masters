/* eslint-disable */
import { iCharacterRace } from '../../../interfaces/externalData interfaces/externalData.interfaces';

export function DataCleanUp<T extends { name: string }>(
  dataName: string,
  data: T[],
): T {
  return data.filter((item) => item.name == dataName)[0];
}

export const hasSubraces = (raceName: string, races: iCharacterRace[]) => {
  const selectedRace = DataCleanUp(raceName, races);
  return selectedRace.subraces.length > 0;
};
