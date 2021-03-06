import { ICharacterDB } from '../../interfaces/characterFromDB.interface';

export const mod = (score:number) => {
  const m = Math.round(score / 2 - 5.1);
  return m;
};
export const positivePrecursor = (num:number) => (num >= 0 ? `+${num}` : num);

export const proficiencyBonusCalc = (level: number) => {
  let proficiencyBonus = 0;
  if (level > 0 && level < 5) proficiencyBonus = 2;
  if (level > 4 && level < 9) proficiencyBonus = 3;
  if (level > 8 && level < 13) proficiencyBonus = 4;
  if (level > 12 && level < 17) proficiencyBonus = 5;
  if (level > 16 && level < 20) proficiencyBonus = 6;
  return proficiencyBonus;
};

export function updateArrObj(obj: ICharacterDB, key:string, newValue:number) {
  const { equipments, ...data } = obj;

  const temp = equipments.filter((item) => item.equipment.name !== key);
  const newItem = equipments.find((item) => item.equipment.name === key);

  // eslint-disable-next-line no-unused-expressions
  newItem && temp.push(Object.assign(newItem, { quantity: newValue }));

  const objToReturn = { equipments: temp, ...data };

  return objToReturn;
}
