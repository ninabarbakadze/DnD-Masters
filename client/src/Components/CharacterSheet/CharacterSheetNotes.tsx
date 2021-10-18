import { useState } from 'react';
import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';

interface IProps {
 note:string
 updateNote: any

}
export default function CharacterSheetNotes({ note, updateNote }: IProps) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {show ? (
        <div>
          <EditableDisplayComponent
            action={updateNote}
            initialVal={note}
            inputType="textarea"
          />
        </div>
      ) : (
        <div>
          <b>MyNotes</b>
        </div>
      )}
      <button type="button" onClick={() => setShow(!show)}>
        {show ? '-' : '+'}
      </button>
    </div>
  );
}
