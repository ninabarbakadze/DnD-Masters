export interface iResourceListItem {
  index: string;
  name: string;
  url?: string;
}

export interface iResourceList {
  count: number;
  results: iResourceList[];
}

export interface iAbilityScore extends iResourceListItem {}

export interface iAbilityBonus {
  bonus: number;
  abilityScore: iAbilityScore;
}

export interface iCharacterProficiency extends iResourceListItem {
  type: string;
}

export interface iCharacterChoice {
  choose: number;
  type: string;
  from: iAbilityScore[] | iResourceListItem[] | string[] | { desc: string }[];
}

export interface iBackgroundFeature {
  name: string;
  desc: string[];
}

export interface iCharacterBackground extends iResourceListItem {
  startingProficiencies: iCharacterProficiency[];
  languageOptions: iCharacterChoice;
  startingEquipment: iResourceListItem[];
  startingEquipmentOptions: iCharacterChoice;
  feature: iBackgroundFeature;
  personalityTraits: iCharacterChoice;
  ideals: iCharacterChoice;
  bonds: iCharacterChoice;
  flaws: iCharacterChoice;
}

export interface iCharacterSubrace extends iResourceListItem {
  desc: string;
  abilityBonuses: iAbilityBonus;
  startingProficiencies: iCharacterProficiency[];
  languages: iResourceListItem[];
  languageOptions: iCharacterChoice;
  traits: iResourceListItem[];
}

export interface iCharacterRace extends iResourceListItem {
  speed: number;
  abilityBonuses: iAbilityBonus[];
  abilityBonusOptions?: iCharacterChoice[];
  alignment: string;
  age: string;
  size: string;
  sizeDescription: string;
  startingProficiencies: iCharacterProficiency[];
  startingProficiencyOptions?: iCharacterChoice[];
  languages: iResourceListItem[];
  languageOptions: iCharacterChoice;
  languageDesc: string;
  traits: iResourceList[];
  subraces: iResourceListItem[];
}
