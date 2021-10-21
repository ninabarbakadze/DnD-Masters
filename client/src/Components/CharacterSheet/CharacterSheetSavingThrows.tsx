import { useState } from 'react';
import { mod, positivePrecursor } from './helper';

interface IAbility{
    name:string
    scores: number
    proficient: boolean
}

interface IProps{
    ability: IAbility[]
   bonus: number
}
function CharacterSheetSavingThrows({ ability, bonus }:IProps) {
  const [hide, setHide] = useState(true);
  const filteredAbility = ability.filter((item) => item.proficient === true);

  const renderShortList = () => (
    <div>
      {filteredAbility.map((item) => (
        <div className="character-sheet-saving-throw-skills-tile" key={item.name}>

          <div className="character-sheet-ability-mod">
            {positivePrecursor(bonus + mod((item.scores)))}
          </div>
            &nbsp;
          <b>{item.name}</b>

        </div>
      ))}
    </div>
  );
  const renderFullList = () => (
    <div>
      {ability.map((item) => (
        <div className="character-sheet-saving-throw-skills-tile" key={item.name}>
          <div className="character-sheet-ability-mod">
            {item.proficient
              ? positivePrecursor(bonus + mod(item.scores))
              : positivePrecursor(mod(item.scores))}
          </div>
            &nbsp;
          {item.proficient ? <b>{item.name}</b> : <span>{item.name}</span>}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {hide ? renderShortList() : renderFullList()}
      <button
        type="button"
        onClick={() => { setHide(!hide); }}
      >
        ...
      </button>
    </div>
  );
}
export default CharacterSheetSavingThrows;
