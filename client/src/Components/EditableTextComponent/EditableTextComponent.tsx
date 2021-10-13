import { ReactElement, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './EditableTextComponent.scss';

type Input= {textfieldValue: string };
export default function EditableTextComponent() {
  const [textfieldValue, setTextfieldValue] = useState('NAME');
  const [isInEditMode, setEditMode] = useState(false);
  let defaultTextValue = textfieldValue;
  const {
    // reset,
    register,
    handleSubmit,
  } = useForm<Input>();

  const switchEditMode = () => {
    setEditMode(!isInEditMode);
    defaultTextValue = textfieldValue;
  };

  const onSubmit: SubmitHandler<Input> = (data) => {
    setEditMode(false);
    setTextfieldValue(data.textfieldValue);
  };

  const renderEditView = (): ReactElement => (
    <div>
      <form className="editable-text-field" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          defaultValue={defaultTextValue}
          {...register('textfieldValue')}
        />
        <button
          className="editable-text-button"
          type="button"
          onClick={switchEditMode}
        >
          ❌
        </button>
        <button
          className="editable-text-button"
          type="submit"
        >
          ✔️
        </button>
      </form>
    </div>
  );
  const renderDefaultView = (): ReactElement => (
    <div className="editable-text-field">
      <div>
        {textfieldValue}
      </div>
      <button
        className="editable-text-button"
        type="button"
        onClick={switchEditMode}
      >
        ✏️
      </button>
    </div>
  );

  return isInEditMode ? renderEditView() : renderDefaultView();
}
