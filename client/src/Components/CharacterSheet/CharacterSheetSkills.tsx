/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  mod,
  positivePrecursor,
} from './helper';

interface IAbility{
    name:string
    scores: number
    proficient: boolean
}
interface ISkills{
    name:string
    proficient:boolean
    ability:string
}
interface IProps{
    skills: ISkills[]
    ability: IAbility[]
    bonus: number
    pasWisdom: any
}
export default function CharacterSheetSkills({
  skills, ability, bonus, pasWisdom,
}:IProps) {
  const [hide, setHide] = useState(true);
  const filteredSkills = skills.filter((item) => item.proficient === true);
  console.log(bonus);
  const renderList = (arr: ISkills[]) => (
    <div>
      {arr.map((skill) => (
        <div className="character-sheet-saving-throw-skills-tile" key={skill.name}>

          <div className="character-sheet-ability-mod">

            {ability.map((ab) => (
              (ab.name === skill.ability)
                ? (skill.proficient && positivePrecursor(mod(ab.scores) + bonus)
              && skill.name === 'Perception' && pasWisdom(mod(ab.scores) + bonus))
               || positivePrecursor(mod(ab.scores)) : null
            ))}
          </div>
                &nbsp;
          {skill.proficient ? (
            <div>
              <b>
                {skill.name}
              </b>

              (
              {skill.ability.slice(0, 3)}
              )
            </div>
          ) : (
            <div>
              <p>
                {skill.name}
                &nbsp;
                (
                {skill.ability.slice(0, 3)}
                )
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {hide ? renderList(filteredSkills) : renderList(skills)}
      <button
        type="button"
        onClick={() => {
          // setHide(!hide);
          console.log('need fixing');
        }}
      >
        ...
      </button>
    </div>
  );
}
