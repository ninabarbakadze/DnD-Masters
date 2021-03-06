import {
  iCharacterRace,
  iCharacterSubrace,
  iCharacterBackground,
  iCharacterClass,
} from './externalData/externalData.interface';

export interface iAbilityArrayScore {
  score: number;
  bonus: number;
}

export interface iAbilityArray {
  str: iAbilityArrayScore;
  dex: iAbilityArrayScore;
  con: iAbilityArrayScore;
  int: iAbilityArrayScore;
  wis: iAbilityArrayScore;
  cha: iAbilityArrayScore;
}

export interface iAbilityBonusOption {
  race?: { max: number; choices: string[] };
  subrace?: { max: number; choices: string[] };
}

export interface iCharacter {
  race?: iCharacterRace;
  subrace?: iCharacterSubrace;
  background?: iCharacterBackground;
  abilityArray?: iAbilityArray;
  class?: iCharacterClass;
}

export interface iCharacterWizardState {
  character?: iCharacter;
  races?: iCharacterRace[];
}
export interface iJoinGameCharacter {
  name: string;
  race: iCharacterRace
}
