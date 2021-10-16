/* eslint-disable arrow-body-style */
import { iCharacter } from '../../../../interfaces/character.interface';

export function checkBonus(character: iCharacter) {
  if (character.race?.ability_bonuses) {
    character.race.ability_bonuses.forEach((mod) => {
      return {
        attr: mod.ability_score.index,
        bonus: mod.bonus,
      };
    });
  }
}

export const x = {};
