// import React from 'react'

import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';
import './CharacterSheet.scss';

interface iProficiency{
    action:any
    name: string
    // eslint-disable-next-line react/require-default-props
    modifier?: number
}

export default function CharacterSheetProficiency({ name, modifier, action }:iProficiency) {
  return (
    <div className="character-sheet-saving-throw-skills-tile">
      {modifier && (
      <EditableDisplayComponent
        action={action}
        initialVal={modifier}
        inputType="number"
      />
      )}
      <p>
        {name}
      </p>
    </div>
  );
}
