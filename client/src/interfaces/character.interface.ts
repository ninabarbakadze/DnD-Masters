import { iCharacterRace, iCharacterSubrace } from './externalData.interfaces';

export interface iCharacter {
  race?: iCharacterRace;
  subrace?: iCharacterSubrace;
}

export interface iCharacterWizardState {
  character?: iCharacter;
  races?: iCharacterRace[];
}
