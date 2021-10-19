/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
import { iCharacterRace } from '../../interfaces/externalData/externalData.interface';

interface props {
  race: iCharacterRace;
}

const RaceDetails = ({ race }: props) => {
  return (
    <div className="  flex flex-col justify-center  w-3/5 align-start text-left">
      <div className="pr-50 pl-10">
        <h3>Ability Bonuses</h3>
        {race.ability_bonuses.map((item, index) => {
          return (
            <div key={index}>
              <p>{`+${item.bonus} to ${item.ability_score.index}`}</p>
            </div>
          );
        })}
        {race?.ability_bonus_options && (
          <>
            <p>{`+1 to ${race.ability_bonus_options.choose} of the following`}</p>
            {race.ability_bonus_options.from.map((item) => (
              <p>{item.ability_score.index}</p>
            ))}
          </>
        )}
        <h3>Alignment & Culture</h3>
        <p>{race.alignment}</p>
        <p>{race.language_desc}</p>
        <h3>Physiology</h3>
        <p>{race.age}</p>
        <p>{race.size_description}</p>
        {race.subraces.length > 0 && (
          <>
            <h3>Subraces</h3>
            <p>{race.subraces.map((item) => item.name)}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default RaceDetails;
