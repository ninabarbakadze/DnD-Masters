import { IWeapon } from '../../interfaces/characterFromDB.interface';
import { positivePrecursor } from './helper';

export default function CharacterSheetAttacks({ weapons }:any) {
  return (
    <div className="character-sheet-attack">
      <div className="character-sheet-attack-header">
        <div className="attack-header">Name</div>
        <div className="attack-header">ATK</div>
        <div className="attack-header">Damage/Type</div>
      </div>
      <div className="character-sheet-attack-list">
        {weapons.map((item:IWeapon) => (
          <div className="character-sheet-attack-list-item">
            <div className="attack-name">{item.name}</div>
            <div className="attack-bonus">
              {
            item.damage.dice.mod
              ? positivePrecursor(item.damage.dice.mod) : '--'
}
            </div>
            <div className="attack-damage">
              {`1d${item.damage.dice.sides}${item.damage.dice.mod
                ? positivePrecursor(item.damage.dice.mod) : '  '} ${item.damage.type}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
