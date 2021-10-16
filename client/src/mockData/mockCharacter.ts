interface iAbilityScore{
  name:string
  value:number
}
interface iAbility{
  bonus:number
  abilityScore: iAbilityScore
}
interface iProficiencyAttribute{
  name:string // handaxe /SRT/animal-handling/language
  proficient?: boolean
  value?:number // q:2  / +3 / +1/ - /
}
interface iProficiency{
  type:string // skill, ability, armor, equipment...
  attribute: iProficiencyAttribute[]
}
export const mockAbilities: iAbility[] = [{
  bonus: 11,
  abilityScore: { value: 11, name: 'STRENGTH' },
},
{
  bonus: +3,
  abilityScore: { value: 15, name: 'DEXTERITY' },
},
{
  bonus: +2,
  abilityScore: { value: 8, name: 'CONSTITUTION' },
},
{
  bonus: -2,
  abilityScore: { value: 7, name: 'INTELLIGENCE' },
},
{
  bonus: 0,
  abilityScore: { value: 10, name: 'WISDOM' },
}];

export const mockProficientAbilities: iProficiency = {
  type: 'ability',
  attribute: [{
    name: 'STR',
    proficient: true,
    value: +2,
  }, {
    name: 'DEX',
    proficient: true,
    value: +3,
  }],
};
export const mockProficientSkills: iProficiency = {
  type: 'skill',
  attribute: [{
    name: 'Animal handling',
    value: +2,
  }, {
    name: 'Nature',
    value: +3,
  }, {
    name: 'Investigation',
    value: +1,
  }],

};
export const mockProficientLanguages: iProficiency = {
  type: 'languages',
  attribute: [{
    name: 'Draconic',
  }, { name: 'Common' }],
};
