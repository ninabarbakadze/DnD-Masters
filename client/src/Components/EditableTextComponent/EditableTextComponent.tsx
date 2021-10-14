import {
  ChangeEvent,
  ReactElement, useState,
} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './EditableTextComponent.scss';

type Input= {textfieldValue: string };
interface IProps {
  action:any
  initialVal: string
}

export default function EditableTextComponent({ action, initialVal }: IProps) {
  const [textfieldValue, setTextfieldValue] = useState(initialVal);
  const [isInEditMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Input>({ defaultValues: { textfieldValue } });

  const switchEditMode = () => {
    setEditMode(!isInEditMode);
    setTextfieldValue(initialVal);
    reset({ textfieldValue });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextfieldValue(e.target.value);
  };

  const onSubmit: SubmitHandler<Input> = (data) => {
    setEditMode(false);
    action(textfieldValue);
    setTextfieldValue(data.textfieldValue);
  };

  const renderEditView = (): ReactElement => (
    <div>
      <form className="editable-text-field" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('textfieldValue')}
          onChange={handleChange}
          value={textfieldValue}
          type="text"
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
