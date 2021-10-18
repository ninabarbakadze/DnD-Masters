import {
  ReactElement, useState,
} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './EditableDisplayComponent.scss';

type Input= {textfieldValue: string | number };
interface IProps {
  action:any
  initialVal?: string | number
  inputType:string | number
  options?: string[] | undefined
  itemKey?: string
}

export default function EditableDisplayComponent({
  action, initialVal, inputType, options, itemKey,
}: IProps) {
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

  const handleChange = (e: any) => {
    setTextfieldValue(e.target.value);
  };

  const onSubmit: SubmitHandler<Input> = (data) => {
    setEditMode(false);
    setTextfieldValue(data.textfieldValue);
    action(textfieldValue, itemKey);
  };

  const renderEditView = (): ReactElement => (
    <div>
      <form className="editable-text-field" onSubmit={handleSubmit(onSubmit)}>
        {((inputType === 'input')
        && (
        <input
          {...register('textfieldValue')}
          onChange={handleChange}
          value={textfieldValue}
          type="text"
        />
        ))
        || (
          (inputType === 'textarea')
          && (
          <textarea
            {...register('textfieldValue')}
            onChange={handleChange}
            value={textfieldValue}
            cols={20}
            rows={10}
            wrap="hard"
          />
          ))
          || (
            (inputType === 'number')
            && (
            <input
              className="number-input"
              {...register('textfieldValue')}
              onChange={handleChange}
              value={textfieldValue}
              type="number"
            />
            ))
            || (
              (inputType === 'options')
              && (
              <select
                {...register('textfieldValue')}
                onChange={handleChange}
                value={textfieldValue}
              >
                  {options?.map((option) => (<option key={`header-${option}`}>{option}</option>))}
              </select>
              ))}
        <button
          className="editable-text-button"
          type="button"
          onClick={switchEditMode}
        >
          <p className="pencil"> ❌</p>
        </button>
        <button
          className="editable-text-button"
          type="submit"
        >
          <p className="pencil">
            ✔️
          </p>
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
        <p className="pencil">✏️</p>
      </button>
    </div>
  );

  return isInEditMode ? renderEditView() : renderDefaultView();
}
