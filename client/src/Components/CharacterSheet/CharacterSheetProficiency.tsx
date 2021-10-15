// import React from 'react'

import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';

interface iProficiency{
    action:any
    name: string
    modifier: number
}

export default function CharacterSheetProficiency({ name, modifier, action }:iProficiency) {
  return (
    <div className="saving-throws">
      <EditableDisplayComponent
        action={action}
        initialVal={modifier}
        inputType="number"
      />
      <p>
        {name}
      </p>
    </div>
  );
}
