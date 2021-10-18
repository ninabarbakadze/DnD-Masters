// import React from 'react'
import './CharacterSheet.scss';
import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';
import { positivePrecursor } from './helper';

interface IProps {
    ability: string
    score: number
    modifier: number
    inputType:string | number
    dispatchAction:any

  }
export default function CharacterSheetAbilityInfo({
  dispatchAction, ability, score, modifier, inputType,
}: IProps) {
  return (
    <div className="character-sheet-ability-info">
      <div className="character-sheet-ability-score">
        <h5>{ ability}</h5>
        <div className="character-sheet-ability-modifier">
          <EditableDisplayComponent
            action={dispatchAction}
            initialVal={score}
            inputType={inputType}
            itemKey={ability}
          />
        </div>
        {positivePrecursor(modifier)}
      </div>
    </div>
  );
}
