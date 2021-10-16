/* eslint-disable */
import { Dispatch, SetStateAction } from 'react';
import { iCharacterChoice } from '../../interfaces/externalData.interfaces';
import { choiceValue } from '../../utilities/choice.utilities';

interface CharacterChoiceProps<T> {
  choices: Pick<iCharacterChoice<T>, 'choose' | 'from'>;
  selected: T[];
  setSelected: Dispatch<SetStateAction<T[]>>;
}

function CharacterChoice<T>({
  choices,
  selected,
  setSelected,
}: CharacterChoiceProps<T>) {
  const { choose, from } = choices;

  const handleChange = (clickedChoice: T) => {
    let newSelected: T[] = [];
    if (selected.includes(clickedChoice)) {
      console.log('already included');
      newSelected = selected.filter((choices) => choices != clickedChoice);
      console.log('new selected removed', newSelected);
      setSelected(newSelected);
    } else {
      newSelected = [...selected, clickedChoice];
      console.log('selected with the addition;');
      selected.length < choose && setSelected([...selected, clickedChoice]);
    }
  };

  const options = from.map((choice, index) => {
    const val = choiceValue(choice);
    return (
      <div key={`${val}${index}`} onClick={(e) => handleChange(choice)}>
        <p>{val}</p>
      </div>
    );
  });

  return (
    <>
      <p>{`Choose ${choose} from:`}</p>
      {options}
    </>
  );
}

export default CharacterChoice;
