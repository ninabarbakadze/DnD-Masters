import { PayloadAction } from '../interfaces/redux.interface';
import { iResourceListItem } from '../interfaces/externalData/externalData.interface';
import { iSpellItem } from '../interfaces/externalData/spells.interface';

export const populateSpells: PayloadAction<iResourceListItem[]> = (
  spellsData,
) => ({
  type: 'POPULATE_SPELLS',
  payload: spellsData,
});

export const populateSpellItems: PayloadAction<iSpellItem> = (spellItem) => ({
  type: 'POPULATE_SPELLITEM',
  payload: spellItem,
});
