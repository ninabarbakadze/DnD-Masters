/* eslint-disable */
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
  ability_score: iAbilityScore;
}

export interface iCharacterProficiency extends iResourceListItem {
  type: string;
}

export interface iCharacterChoice<T> {
  choose: number;
  type: string;
  from: T[];
}

export interface iBackgroundFeature {
  name: string;
  desc: string[];
}
export interface idealChoice {
  desc: string;
}

export type tSelectedChoice = string[];

export interface iCharacterBackground extends iResourceListItem {
  startingProficiencies: iCharacterProficiency[];
  languageOptions: iCharacterChoice<iResourceListItem>;
  starting_equipment: iResourceListItem[];
  starting_equipment_opptions: iCharacterChoice<iResourceListItem>;
  feature: iBackgroundFeature;
  personality_traits: iCharacterChoice<string>;
  chosen_personality_trait?: tSelectedChoice;
  ideals: iCharacterChoice<Extract<string, idealChoice>>;
  chosen_ideal?: tSelectedChoice;
  bonds: iCharacterChoice<string>;
  chosen_bond?: tSelectedChoice;
  flaws: iCharacterChoice<string>;
  chosen_flaw?: tSelectedChoice;
}

export interface iCharacterSubrace extends iResourceListItem {
  desc: string;
  ability_bonuses: iAbilityBonus;
  starting_proficiencies: iCharacterProficiency[];
  ability_bonus_options?: iCharacterChoice<iAbilityBonus>;
  languages: iResourceListItem[];
  language_options?: iCharacterChoice<iResourceListItem>;
  traits: iResourceListItem[];
}

export interface iCharacterRace extends iResourceListItem {
  speed: number;
  ability_bonuses: iAbilityBonus[];
  ability_bonus_options?: iCharacterChoice<iAbilityBonus>;
  alignment: string;
  age: string;
  size: string;
  size_description: string;
  starting_proficiencies: iCharacterProficiency[];
  starting_proficiency_options?: iCharacterChoice<iResourceListItem>;
  languages: iResourceListItem[];
  language_options?: iCharacterChoice<iResourceListItem>;
  language_desc: string;
  traits: iResourceList[];
  subraces: iResourceListItem[];
}
