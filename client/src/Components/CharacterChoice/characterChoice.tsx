/* eslint-disable */
import { useState, ChangeEvent } from 'react';
import { iCharacterChoice } from '../../interfaces/externalData.interfaces';

export

function CharacterChoice<T>({ choose,from }:iCharacterChoice<T>) {
  const [selected,setSelected] = useState<any[]>([]);
  
  function choiceValue( choice:any):string{
    const name = choice.name||choice.ability_score.name||choice
    return name
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=> {
    selected.includes((choice:T) =>  choiceValue(choice) == e.target.value)

  }
  
  const text = `Choose ${choose} from:`;
  const options = from.map((choice) => {
    const val = choiceValue(choice)
    return (
      <input
        type="checkbox"
        key={val}
        name={val}
        value={val}
        id={val}
        onChange={handleChange}
      />
    )
  })
  
  return (
    <>
      <p>{text}</p>
      <form>
    

      </form>
    </>
  )
}

export default CharacterChoice