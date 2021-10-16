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

export const x = {};
