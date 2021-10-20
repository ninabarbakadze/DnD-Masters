/* eslint-disable arrow-body-style */
import { iCharacterClass } from '../../../interfaces/externalData/externalData.interface';

interface props {
  CLASS: iCharacterClass;
}

const ClassDetails = ({ CLASS }: props) => {
  return (
    <div className=" pr-50 pl-10 flex flex-col justify-center w-3/5 align-start text-left">
      <div>
        <h3>Hit Dice</h3>
        <p>{`d${CLASS.hit_die}`}</p>
      </div>
      <div>
        <h3>Main Attributes and Saving Throws</h3>
        {CLASS.saving_throws.map((item) => {
          return (
            <div key={item.index}>
              <p>{item.index}</p>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Profficiencies</h3>
        <div className="grid grid-cols-3 gap-3">
          {CLASS.proficiencies.map((item) => {
            return (
              <div key={item.index}>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3>Subclasses</h3>
        {CLASS.subclasses.map((item) => {
          return (
            <div key={item.index}>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      {CLASS.spellcasting && (
        <div>
          <h3>Spell Casting Ability</h3>
          <p>
            {
              CLASS.spellcasting.info.filter(
                (item) => item.name === 'Spellcasting Ability',
              )[0].desc
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
