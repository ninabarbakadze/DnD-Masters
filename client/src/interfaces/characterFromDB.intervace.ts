/* eslint-disable semi */
export interface IBackground { name: string }
export interface IArmorClass {
    value: number,
    description: string,
  }
export interface IHitPoints{
    max: number,
    current: number,
    temporary: number,
  }
export interface IDeathSaves{
    success:number
    fails: number
  }
export interface INameNode {
    index: string,
    name: string,
    url: string,
  }
export interface ISkill{
    name: string,
    ability: string,
    proficient: boolean,
  }
export interface ICharDetails{
    personality: string[],
    ideal: string,
    bond: string,
    flaw: string,
  }
export interface IAbilities{
    name: string,
  scores: number,
  proficient: boolean,
}
export interface IDice{
    mod?: number,
    sides: number,
    count: number,

}
export interface IDamage{
    dice:IDice,
    type: string,
}
export interface IWeaponProp{
    Versatile?: boolean,
    Finesse?: boolean,
    Light?: boolean,
    Thrown?: boolean,
}
export interface IThrowRange {
    short: number,
    long: number,
  }
export interface IWeapon{
    name: string,
    equipped?: boolean,
    damage: IDamage,
    properties: IWeaponProp,
    // eslint-disable-next-line camelcase
    throw_range:IThrowRange, }
export interface ISpells{
    name: string,
    desc: string[],
  }

export interface IEquipment{
    equipment: INameNode,
    quantity: number,
  }

export interface ICharacterRace{
    name: String,
    size: String,
    traits: INameNode[],
    subRaces: String,
    index: String,
  }

export interface ICurrency{
    CP: number,
    SP: number,
    EP: number,
    GP: number,
    PP: number,
  }
export interface IFeatures{
    desc: string[],
    name: String,
}
export interface ICharacterClass{
    name: string,
  hitDie: number,
  subtype: string,
  level: number,
  spellCasting: INameNode,
  features:IFeatures,
}
export interface ICharacterDB {
_id: string,
user:string,
  name: string,
  xp:number,
  saved: boolean,
  characterName: string,
  alignment: string,
  speed: number,
  initiative: number
  proficiencyBonus: number
  background: IBackground,
  armorClass: IArmorClass,
  hitPoints: IHitPoints,
  passiveWisdom: number,
  deathSaves: IDeathSaves,
  languages: INameNode[],
  skills: ISkill[],
  details: ICharDetails,
  abilityScores: IAbilities[],
  savingThrow: string[],
  weapons: IWeapon[],
  spells: ISpells,
  currency: ICurrency,
  equipments: IEquipment[],
  race: ICharacterRace,
  classes: ICharacterClass,
  proficiencies: INameNode,
}
