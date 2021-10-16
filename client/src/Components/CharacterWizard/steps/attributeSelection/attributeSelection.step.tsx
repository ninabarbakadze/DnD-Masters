/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  iCharacter,
  iAbilityArray,
} from '../../../../interfaces/character.interface';
import { IRootState } from '../../../../reducers';
import { iWizardStepProps } from '../../../../interfaces/wizard.interface';
import AttributePointBuy from './attributePointBuy.component';
import { addRaceBonus } from './attributeSelection.helpers';

const startArray: iAbilityArray = {
  str: { score: 10, bonus: 0 },
  dex: { score: 10, bonus: 0 },
  con: { score: 10, bonus: 0 },
  int: { score: 10, bonus: 0 },
  wis: { score: 10, bonus: 0 },
  cha: { score: 10, bonus: 0 },
};

const AttributeSelectionStep = ({
  path,
  onSubmit,
}: iWizardStepProps<iCharacter>) => {
  const [abilityArray, setAbilityArray] = useState<iAbilityArray>(startArray);
  const [pool, setPool] = useState<number>(27);

  const character = useSelector(
    (state: IRootState) => state.characterCreationReducer,
  );

  useEffect(() => {
    setAbilityArray(addRaceBonus(character, abilityArray));
  }, []);

  function increment(direction, value) {
    let score = abilityArray[value].score;
    if (direction == '-') {
      score--;
      setPool(pool + 1);
    } else {
      score++;
      setPool(pool - 1);
    }
    const newAbilityArray = { ...abilityArray };
    newAbilityArray[value].score = score;
    setAbilityArray(newAbilityArray);
  }
  const abilityKeys = Object.keys(abilityArray);

  const pointBuyArray = abilityKeys.map((key) => {
    return (
      <AttributePointBuy
        value={abilityArray[key].score}
        key={key}
        increment={increment}
        name={key}
        bonus={abilityArray[key].bonus}
      />
    );
  });

  return (
    <div>
      <h2>Attribute Selection</h2>
      {pointBuyArray}
    </div>
  );
};

export default AttributeSelectionStep;
