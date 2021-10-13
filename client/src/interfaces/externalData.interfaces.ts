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

export interface iCharacterRace {
  index: string;
  name: string;
  speed: number;
  abilityBonuses: iAbilityBonus[];
  abilityBonusOptions?: iCharacterChoice[];
  alignment: string;
  age: string;
  size: string;
  startingProficiencies: iCharacterProficiency[];
  startingProficiencyOptions?: iCharacterChoice[];
  languages: iResourceList[];
  traits: iResourceList[];
  subraces: iResourceList[];
}
