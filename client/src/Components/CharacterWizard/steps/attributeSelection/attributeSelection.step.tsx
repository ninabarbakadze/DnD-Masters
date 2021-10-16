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
import {
  addRaceBonus,
  getAbilityBonusOptions,
} from './attributeSelection.helpers';
import AbilityBonusChoice from './attributeOptionChoice';

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
  const [bonusChoices, setBonusChoices] = useState();

  const character = useSelector(
    (state: IRootState) => state.characterCreationReducer,
  );

  useEffect(() => {
    setAbilityArray(addRaceBonus(character, abilityArray));
    setBonusChoices(getAbilityBonusOptions(character));
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

  // // const raceChoices = bonusChoices.race.choices.map((choice) => {
  // //   return (
  // //     <AbilityBonusChoice
  // //       name={choice}
  // //       index={choice}
  // //       handleClick={() => {}}
  // //       slected={false}
  // //     />
  // //   );
  // // });

  // const subraceChoices = bonusChoices.subrace.choices.map((choice) => {
  //   return (
  //     <AbilityBonusChoice
  //       name={choice}
  //       index={choice}
  //       handleClick={() => {}}
  //       slected={false}
  //     />
  //   );
  // });

  return (
    <div>
      <h2>Attribute Selection</h2>
      <div>
        {bonusChoices?.race && (
          <div>
            <h3>
              {`choose ${bonusChoices.race.max} from ${character?.race?.name} bonuses:`}{' '}
            </h3>
            {bonusChoices.race.choices.map((choice) => {
              return (
                <AbilityBonusChoice
                  key={choice}
                  name={choice}
                  index={choice}
                  handleClick={() => {}}
                  slected={false}
                />
              );
            })}
          </div>
        )}
        {bonusChoices?.subrace && (
          <div>
            <h3>
              {`choose ${bonusChoices.subrace.max} from ${character?.subrace?.name} bonuses:`}{' '}
            </h3>
            {bonusChoices.race.choices.map((choice) => {
              return (
                <AbilityBonusChoice
                  key={choice}
                  name={choice}
                  index={choice}
                  handleClick={() => {}}
                  slected={false}
                />
              );
            })}
          </div>
        )}
        {pointBuyArray}
      </div>
    </div>
  );
};

export default AttributeSelectionStep;
