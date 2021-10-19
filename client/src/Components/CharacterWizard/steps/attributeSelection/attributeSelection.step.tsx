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
import { updateAbilityArray } from '../../../../actions/characterCreationWizard.actions';

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
  const [pool, setPool] = useState<number>(18);
  const [bonusChoices, setBonusChoices] = useState([]);
  const [selectedBonuses, setSelectedBonuses] = useState([]);

  const character = useSelector(
    (state: IRootState) => state.characterCreationReducer,
  );

  useEffect(() => {
    setAbilityArray(addRaceBonus(character, abilityArray));
    setBonusChoices(getAbilityBonusOptions(character));
  }, []);

  function handleBonusChoice(name: string) {
    const bonuses = [...selectedBonuses];
    if (bonuses.includes(name)) {
      setSelectedBonuses(selectedBonuses.filter((choice) => choice != name));
      const newAbilityArray = { ...abilityArray };
      newAbilityArray[name].bonus--;
      setAbilityArray(newAbilityArray);
    } else if (selectedBonuses.length < bonusChoices.race.max) {
      setSelectedBonuses([...selectedBonuses, name]);
      const newAbilityArray = { ...abilityArray };
      newAbilityArray[name].bonus++;
      setAbilityArray(newAbilityArray);
    }
  }

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
      <div>
        {bonusChoices?.race && (
          <div className="my-4">
            <h3>
              {`choose ${bonusChoices.race.max} from ${character?.race?.name} bonuses:`}{' '}
            </h3>
            <div className="space-x-4">
              {bonusChoices.race.choices.map((choice) => {
                return (
                  <AbilityBonusChoice
                    key={choice}
                    name={choice}
                    handleClick={handleBonusChoice}
                    slected={selectedBonuses.includes(choice)}
                  />
                );
              })}
            </div>
          </div>
        )}
        {bonusChoices?.subrace && (
          <div className="my-4">
            <h3>
              {`choose ${bonusChoices.subrace.max} from ${character?.subrace?.name} bonuses:`}{' '}
            </h3>
            <div className="space-x-4">
              {bonusChoices.race.choices.map((choice) => {
                return (
                  <AbilityBonusChoice
                    key={choice}
                    name={choice}
                    handleClick={() => {}}
                    slected={false}
                  />
                );
              })}
            </div>
          </div>
        )}
        <div className="my-4">
          <h3>{`${pool} points to spend`}</h3>
          {pointBuyArray}
        </div>
      </div>
      <button
        className="main-button"
        type="button"
        onClick={() => onSubmit({ abilityArray }, updateAbilityArray, path)}
        disabled={pool == 0}
      >
        Submit
      </button>
    </div>
  );
};

export default AttributeSelectionStep;
