/* eslint-disable arrow-body-style */
import {
  iAbilityArray,
  iAbilityBonusOption,
  iCharacter,
} from '../../../../interfaces/character.interface';

export function addRaceBonus(
  character: iCharacter,
  abilityArray: iAbilityArray,
) {
  const newAbilityArray = { ...abilityArray };
  if (character.race?.ability_bonuses) {
    character.race.ability_bonuses.forEach((mod) => {
      newAbilityArray[mod.ability_score.index as keyof iAbilityArray].bonus += mod.bonus;
    });
  }
  return newAbilityArray;
}

export function getAbilityBonusOptions(
  character: iCharacter,
): iAbilityBonusOption {
  const abilityBonusChoices:iAbilityBonusOption = {};
  if (character.race?.ability_bonus_options) {
    const bonus = character.race.ability_bonus_options;
    const choices = bonus.from.map((choice) => choice.ability_score.index);
    const max = bonus.choose;
    abilityBonusChoices.race = { choices, max };
  }
  return abilityBonusChoices;
}
