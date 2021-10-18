/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
import { iCharacterRace } from '../../interfaces/externalData/externalData.interface';

interface props {
  race: iCharacterRace;
}

const RaceDetails = ({ race }: props) => {
  return (
    <div>
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
      {race.alignment}
      {race.language_desc}
      <h3>Physiology</h3>
      {race.age}
      {race.size_description}
      {race.subraces.length && (
        <>
          <h3>Subraces</h3>
          {race.subraces.map((item) => item.name)}
        </>
      )}
    </div>
  );
};

export default RaceDetails;
