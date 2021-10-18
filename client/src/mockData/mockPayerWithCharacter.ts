/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable max-len */
// @ts-ignore
import { iCharacter } from '../interfaces/character.interface';

const formatCharacter = (charFromWizard:iCharacter) => {
  console.log('format character', charFromWizard);
  const updateSkillProficiency = (skill:string, arr:any) => {
    if (skill === arr[0].index) return true;
    if (skill === arr[1].index) return true;
    return false;
  };

  const {
    abilityArray, background, race, subrace,
  } = charFromWizard;
  const {
    cha, con, dex, int, str, wis,
  }:any = abilityArray;
  const {
    chosen_bond, chosen_flaw, chosen_ideal, chosen_personality_trait, feature,
    // starting_equipment,
    starting_proficiencies,
  } :any = background;
  const {
    hit_die, proficiencies, proficiency_choices, saving_throws, spellcasting, starting_equipment, subclasses,
  } :any|undefined = charFromWizard.class;
  const {
    ability_bonuses, age, size, speed,
    // starting_proficiencies,
    traits, alignment, languages,
  }:any = race;
  console.log(updateSkillProficiency('skill-religion', starting_proficiencies));
  const mockCharacter:any = {
    note: 'note goes here',
    // name: ' Dragonborn Sorcerer',

    name: 'Jon Doe',
    characterName: 'EDON',
    xp: 1,
    initiative: 3,
    race: {
      name: race?.name,
      subrace: subrace?.name,
      traits,
    },
    classes: {
      name: charFromWizard.class?.name,
      subtype: subclasses,
      level: 1,
      hitDie: hit_die,
      spellCasting: spellcasting?.spellcasting_ability,
      features: feature,
    },
    alignment,
    speed: {
      walk: speed,
    },
    hitPoints: {
      max: 9,
      current: 5,
      temporary: 0,
    },
    deathSaves: {
      success: 3,
      fails: 3,
    },

    passiveWisdom: 10,
    abilityScores: [
      { name: 'Strength', scores: str.score + str.bonus, proficient: true },
      { name: 'Dexterity', scores: dex.score + dex.bonus, proficient: false },
      { name: 'Constitution', scores: con.score + con.bonus, proficient: true },
      { name: 'Intelligence', scores: int.score + int.bonus, proficient: false },
      { name: 'Wisdom', scores: wis.score + wis.bonus, proficient: false },
      { name: 'Charisma', scores: cha.score + cha.bonus, proficient: false },
    ],
    skills: [
      { name: 'Acrobatics', ability: 'Dexterity', proficient: false },
      { name: 'Animal Handling', ability: 'Wisdom', proficient: false },
      { name: 'Arcana', ability: 'Intelligence', proficient: false },
      { name: 'Athletics', ability: 'Strength', proficient: false },
      { name: 'Deception', ability: 'Charisma', proficient: false },
      { name: 'History', ability: 'Intelligence', proficient: false },
      { name: 'Insight', ability: 'Wisdom', proficient: true },
      { name: 'Intimidation', ability: 'Charisma', proficient: false },
      { name: 'Investigation', ability: 'Intelligence', proficient: false },
      { name: 'Medicine', ability: 'Wisdom', proficient: false },
      { name: 'Nature', ability: 'Intelligence', proficient: false },
      { name: 'Perception', ability: 'Wisdom', proficient: false },
      { name: 'Performance', ability: 'Charisma', proficient: false },
      { name: 'Persuasion', ability: 'Charisma', proficient: false },
      { name: 'Religion', ability: 'Intelligence', proficient: true },
      { name: 'Sleight of Hand', ability: 'Dexterity', proficient: false },
      { name: 'Stealth', ability: 'Dexterity', proficient: false },
      { name: 'Survival', ability: 'Wisdom', proficient: false },
    ],
    armorClass: {
      value: 14,
      description: 'natural armor',
    },
    // savingThrows: [
    //   { name: 'Strength', proficient: false },
    //   { name: 'Dexterity', proficient: false },
    //   { name: 'Constitution', proficient: true },
    //   { name: 'Intelligence', proficient: false },
    //   { name: 'Wisdom', proficient: false },
    //   { name: 'Charisma', proficient: true },
    // ],
    languages,
    background: {
      name: background?.name,
    },
    details: {
      personality: chosen_personality_trait,
      ideal: chosen_ideal[0],
      bond: chosen_bond[0],
      flaw: chosen_flaw[0],
    },
    weapons: [
      {
        name: 'Quarterstaff',
        damage: {
          dice: {
            sides: 6,
            count: 1,
          },
          type: 'Bludgeoning',
        },
        equipped: true,
        properties: {
          Versatile: true,
        },
      },
      {
        name: 'Dagger',
        damage: {
          dice: {
            sides: 4,
            count: 1,
            mod: 1,
          },
          type: 'Piercing',
        },
        throw_range: {
          short: 20,
          long: 60,
        },
        properties: {
          Finesse: true,
          Light: true,
          Thrown: true,
        },
      },
    ],
    spells: spellcasting?.info,
    proficiencies,
    equipments: starting_equipment,
  };
  return mockCharacter;
};
export default formatCharacter;
