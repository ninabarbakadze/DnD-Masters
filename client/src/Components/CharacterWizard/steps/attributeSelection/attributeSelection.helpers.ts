/* eslint-disable arrow-body-style */
// @ts-nocheck
import {
  iAbilityArray,
  iCharacter,
} from '../../../../interfaces/character.interface';

export function addRaceBonus(
  character: iCharacter,
  abilityArray: iAbilityArray,
) {
  const newAbilityArray = { ...abilityArray };
  if (character.race?.ability_bonuses) {
    character.race.ability_bonuses.forEach((mod) => {
      newAbilityArray[mod.ability_score.index].bonus += mod.bonus;
    });
  }
  if (character.subrace?.ability_bonuses) {
    character.subrace.ability_bonuses.forEach((mod) => {
      newAbilityArray[mod.ability_score.index].bonus += mod.bonus;
    });
  }
  return newAbilityArray;
}

export function getAbilityBonusOptions(character: iCharacter) {
  const abilityBonusChoices = {};
  if (character.race?.ability_bonus_options) {
    const bonus = character.race.ability_bonus_options;
    const choices = bonus.from.map((choice) => choice.ability_score.index);
    const max = bonus.choose;
    abilityBonusChoices.race = { choices, max };
  }
  if (character.subrace?.ability_bonuses_options) {
    const bonus = character.subrace.ability_bonus_options;
    const choices = bonus.from.map((choice) => choice.ability_score.index);
    const max = bonus.choose;
    abilityBonusChoices.subrace = { choices, max };
  }
  console.log(abilityBonusChoices);
  return abilityBonusChoices;
}

export const x = {};
