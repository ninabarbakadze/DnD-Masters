import { iCharacterRace } from './externalData.interfaces';

export interface iCharacter {
  race?: iCharacterRace;
}

export interface iCharacterWizardState {
  character?: iCharacter;
  races?: iCharacterRace[];
}
