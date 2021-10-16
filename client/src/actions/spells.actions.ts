import { PayloadAction } from '../interfaces/reduxInterfaces';
import { iResourceListItem } from '../interfaces/externalData interfaces/externalData.interfaces';
import { iSpellItem } from '../interfaces/externalData interfaces/spells.interface';

export const populateSpells: PayloadAction<iResourceListItem[]> = (spellsData) => ({
  type: 'POPULATE_SPELLS',
  payload: spellsData,
});

export const populateSpellItems: PayloadAction<iSpellItem> = (spellItem) => ({
  type: 'POPULATE_SPELLITEM',
  payload: spellItem,
});
