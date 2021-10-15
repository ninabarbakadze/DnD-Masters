import { iCharacterRace, iCharacterSubrace, iCharacterBackground } from './externalData.interfaces';

export interface iCharacter {
  race?: iCharacterRace;
  subrace?: iCharacterSubrace;
  background?: iCharacterBackground;
}

export interface iCharacterWizardState {
  character?: iCharacter;
  races?: iCharacterRace[];
}
