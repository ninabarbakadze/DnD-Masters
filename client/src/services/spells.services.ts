import { getResourceList, getResource } from './externalData.service';

const spellsList = async () => {
  const spellsArr = await getResourceList('spells');
  return spellsArr;
};

const spellsResource = async (resource: string) => {
  const spell = await getResource('spells', resource);
  return spell;
};

export { spellsList, spellsResource };
