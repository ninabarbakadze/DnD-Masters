import { tSelectedChoice } from '../interfaces/externalData.interfaces';

export function choiceValue(choice: any): string {
  return choice?.name || choice?.ability_score?.name || choice?.desc || choice;
}

export function chosenToStrings(choice: any[]): tSelectedChoice {
  return choice.map((item) => choiceValue(item));
}

export const x = {};
