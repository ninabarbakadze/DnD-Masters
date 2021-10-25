import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { iCharacterChoice } from '../../interfaces/externalData/externalData.interface';
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

  const handleChange = (e: MouseEvent, clickedChoice: T) => {
    e.preventDefault();
    let newSelected: T[] = [];
    if (selected.includes(clickedChoice)) {
      newSelected = selected.filter((choice) => choice !== clickedChoice);
      setSelected(newSelected);
    } else {
      newSelected = [...selected, clickedChoice];
      if (selected.length < choose) {
        setSelected([...selected, clickedChoice]);
      }
    }
  };

  const options = from.map((choice) => {
    const val = choiceValue(choice);
    return (
      <div
        className="h-20 w-50"
        key={`${val}`}
        onClick={(e) => handleChange(e, choice)}
        aria-hidden="true"
      >
        <div className="main-button bg-color-gray-400">
          <p>{val}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <p>{`Choose ${choose} from:`}</p>
      <div className="grid grid-cols-3 gap-3">{options}</div>
    </>
  );
}

export default CharacterChoice;
