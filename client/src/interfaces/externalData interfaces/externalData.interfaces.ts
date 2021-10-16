export interface iResourceListItem {
  index: string;
  name: string;
  url: string;
}

export interface iResourceList {
  count: number;
  results: iResourceList[];
}

export interface iAbilityScore {
  index: string;
  name: string;
}

export interface iAbilityBonus {
  bonus: number;
  abilityScore: iAbilityScore;
}

export interface iCharacterProficiency {
  index: string;
  type: string;
  name: string;
}

export interface iCharacterChoice {
  choose: number;
  type: string;
  from: iAbilityScore[] | iResourceList[];
}

export interface iCharacterSubrace {
  index: string;
  name: string;
  desc: string;
  abilityBonuses: iAbilityBonus;
  startingProficiencies: iCharacterProficiency[];
  languages: iResourceListItem[];
  languageOptions: iCharacterChoice;
  racialTraits: iResourceListItem[];
}

export interface iCharacterRace {
  index: string;
  name: string;
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
  languageDesc: string;
  traits: iResourceList[];
  subraces: iResourceListItem[];
}
