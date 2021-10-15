// import React from 'react'

import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';

interface IProps {
    ability: string
    score: number
    modifier: number
    inputType:string | number
    // eslint-disable-next-line react/require-default-props
    options?: string[] | undefined
    dispatchAction:any
  }
export default function CharacterSheetAbilityInfo({
  dispatchAction, ability, score, modifier, inputType, options,
}: IProps) {
  return (
    <div className="character-sheet-ability">
      <div className="character-sheet-ability-info">
        <div className="character-sheet-ability-score">
          <h5>{ability}</h5>
          {score}
          <div className="character-sheet-ability-modifier">
            <EditableDisplayComponent
              action={dispatchAction}
              initialVal={modifier}
              inputType={inputType}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
