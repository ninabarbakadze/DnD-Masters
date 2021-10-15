/* eslint-disable */
import { ChangeEvent,Dispatch, SetStateAction } from 'react';
import { iCharacterChoice } from '../../interfaces/externalData.interfaces';

interface CharacterChoiceProps<T> {
  choices:Pick<iCharacterChoice<T>,"choose"|"from">,
  selected: any[], 
  setSelected: Dispatch<SetStateAction<any[]>>
}

function CharacterChoice<T>({
  choices,
  selected,
  setSelected
}:CharacterChoiceProps<T>,
) {
  const {choose,from} = choices
  
  function choiceValue( choice:any):string{
    return choice?.name||choice?.ability_score?.name||choice?.desc||choice
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const choice = JSON.stringify(e.target.value)

    if(selected.includes(choice)){
      console.log('yippy')
      setSelected(selected.filter(choices => choices !=choice));
    } else{
      selected.length>= choose? e.target.checked = false:
      setSelected([...selected,choice]);
    }
  };
  
  const options = from.map((choice,index) => {
    const val = choiceValue(choice)
    return (
      <div key={`${val}${index}`}>
        <label htmlFor={val}>{val}</label>
        <input
          type="checkbox"
          name={val}
          value={JSON.stringify(choice)}
          id={val}
          onChange={handleChange}
          // disabled={selected.length>=choose}
        />
      </div>
    )
  })
  
  return (
    <>
      <p>{`Choose ${choose} from:`}</p> 
      {options}
    </>
  )
}

export default CharacterChoice