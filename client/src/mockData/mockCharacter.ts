import { iAbilityBonus } from '../interfaces/externalData.interfaces';

const mockAbilities: iAbilityBonus[] = [{
  bonus: +1,
  abilityScore: { index: 'strength', name: 'STRENGTH' },
},
{
  bonus: +3,
  abilityScore: { index: 'strength', name: 'DEXTERITY' },
},
{
  bonus: +2,
  abilityScore: { index: 'strength', name: 'CONSTITUTION' },
},
{
  bonus: -2,
  abilityScore: { index: 'strength', name: 'INTELLIGENCE' },
},
{
  bonus: 0,
  abilityScore: { index: 'strength', name: 'WISDOM' },
}];

export default mockAbilities;
