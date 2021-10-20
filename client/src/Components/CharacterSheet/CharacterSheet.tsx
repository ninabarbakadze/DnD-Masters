/* eslint-disable no-unused-vars */
import './CharacterSheet.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import photos from '../../assets/racePhotos/racePhotos';
import { IRootState } from '../../reducers';
// import CharacterSheetNotes from './CharacterSheetNotes';
import mockCharacter from '../../mockData/mockCharackter';
import CharacterSheetSkills from './CharacterSheetSkills';
import CharacterSheetFeatures from './CharacterSheetFeatures';
import CharacterSheetDeathSaves from './CharacterSheetDeathSaves';
import formatCharacter from './CharacterFormater';
import CharacterSheetAbilityInfo from './CharacterSheetAbilityInfo';
import CharacterSheetSavingThrows from './CharacterSheetSavingThrows';
import { mod, proficiencyBonusCalc, positivePrecursor } from './helper';
import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';
// import { saveCharacter } from '../../services/character.sevices';
import ButtonForSaveOrUpdate from './ButtonForSaveOrUpdate';

interface IProps{
  fetched:any |undefined
}
export default function CharacterSheet({ fetched }:IProps) {
  const username = useSelector((state:IRootState) => state.user.name);
  const newCharacter = useSelector((state:IRootState) => state.characterCreationReducer);
  const formatted = fetched || formatCharacter(newCharacter);
  // const formatted = formatCharacter(newCharacter);

  const [character, setCharacter] = useState({ ...formatted });
  const { success, fails } = character.deathSaves;

  const modifyPassiveWisdom = (perception:number) => {
    // setCharacter((preVal:any) => ({ ...preVal, passiveWisdom: perception }));
    console.log('passWis', perception + character.passiveWisdom);
  };
  const updateCharacterAbility = (updateValue: number, attributeName:string) => {
    const updateAbilityScrList = character.abilityScores.map((item:any) => {
      if (item.name === attributeName) {
        const updateAbility = {
          ...item,
          scores: Number(updateValue),
        };
        return updateAbility;
      }
      return item;
    });
    setCharacter((prevVal:any) => ({ ...prevVal, abilityScores: updateAbilityScrList }));
  };
  // console.log('Character', newCharacter);

  const updateDeathSaves = (result:string) => {
    // eslint-disable-next-line no-unused-expressions
    (result === 'success'
    && success > 0
    && setCharacter((prevVal:any) => ({
      ...prevVal,
      deathSaves:
      {
        ...prevVal.deathSaves,
        success:
        success - 1,
      },
    })))
    || (result === 'fails' && fails > 0
    && setCharacter((prevVal:any) => ({
      ...prevVal,
      deathSaves:
      {
        ...prevVal.deathSaves,
        fails:
        fails - 1,
      },
    })));
  };
  console.log(newCharacter);
  console.log(formatted);
  return (
    <div className="character-sheet-background ">
      <div className="character-sheet bg-gray-300">
        <div className="character-sheet-header bg-gray-400">
          <div className="character-sheet-avatar-container" />
          <div className="character-sheet-initial-information">
            <h5 className="character-sheet-username">
              User Name:
              &nbsp;
              <span>{username}</span>
            </h5>
            <div className="character-name">
              {/* <b>Character Name</b> */}
              <EditableDisplayComponent
                inputType="input"
                action={(val:string) => { setCharacter((prevVal:any) => ({ ...prevVal, characterName: val })); }}
                initialVal=" Character Name"
              />
              <hr />
              {/* <h4 className="character-sheet-campaign">Campaign Name</h4> */}
            </div>
            <img
              className="character-sheet-img"
              // @ts-ignore
              src={photos[character.race.index.replace('-', '')]}
              alt={character.race.index}
            />
            <div className="character-sheet-background-info">
              <div className="character-sheet-CLB">
                <div>
                  <h3>
                    Class:
                    &nbsp;
                    <em>{character.classes.name}</em>
                  </h3>
                </div>
                <div>
                  <h3>
                    Level:
                    &nbsp;
                    <em>{character.classes.level}</em>
                  </h3>
                </div>
                <div>
                  <h3>
                    Background:
                    &nbsp;
                    <em>{character.background.name}</em>
                  </h3>
                </div>
              </div>
              <div className="character-sheet-RAX">
                <div>
                  <h3>
                    Race:
                  &nbsp;
                    <em>{character.race.name}</em>
                  </h3>
                </div>
                <div>
                  <h3>
                    XP:
                  &nbsp;
                    <em>{character.xp}</em>
                  </h3>
                </div>
              </div>
            </div>
            <div>
              <h3>
                Alignment:
                &nbsp;
                <em>{character.alignment}</em>
              </h3>
            </div>
          </div>
        </div>
        <div className="character-sheet-body">
          <div className="character-sheet-action">
            <div className="character-sheet-action-row-1">
              <div className="character-sheet-ability-proficiency">
                <div className="character-sheet-ability">
                  {character.abilityScores.map((ability:any) => (
                    <CharacterSheetAbilityInfo
                      key={ability.name}
                      dispatchAction={updateCharacterAbility}
                      ability={ability.name}
                      score={ability.scores}
                      modifier={mod(ability.scores)}
                      inputType="number"
                    />
                  ))}
                </div>
                <div className="character-sheet-proficiency">
                  <div className="character-sheet-inspiration">
                    <EditableDisplayComponent
                      action={(val:string) => { setCharacter((prevVal:any) => ({ ...prevVal, inspiration: val })); }}
                      initialVal={0}
                      inputType="number"
                    />
                    <h4> INSPIRATION</h4>
                  </div>
                  <div className="character-sheet-perception">
                    <h5>
                      {positivePrecursor(character.passiveWisdom)}
                      &nbsp;
                      Passive Wisdom (perception)
                    </h5>
                  </div>
                  <div className="character-sheet-proficiency-bonus">
                    <div className="character-sheet-PB">
                      <h4>
                        {positivePrecursor(proficiencyBonusCalc(character.classes.level))}
                        &nbsp;
                        PROFICIENCY BONUS
                      </h4>
                    </div>
                  </div>
                  <div className="character-sheet-saving-throws">
                    <h4>SAVING THROWS :</h4>
                    <CharacterSheetSavingThrows
                      ability={character.abilityScores}
                      bonus={proficiencyBonusCalc(character.classes.level)}
                    />
                  </div>
                  <div className="character-sheet-skills">
                    <h4>  SKILLS:</h4>
                    <CharacterSheetSkills
                      skills={character.skills}
                      ability={character.abilityScores}
                      bonus={proficiencyBonusCalc(character.classes.level)}
                      pasWisdom={modifyPassiveWisdom}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="character-sheet-languages">
                  <h4> Other Proficiencies & languages</h4>
                  <b>Languages</b>
                  <br />
                  {character.languages.map((attribute:any) => (
                    <b key={attribute.name}>
                      {attribute.name}
                  &nbsp;
                    </b>
                  ))}
                  <br />
                  <b>Other</b>
                  <br />
                  {character.proficiencies.map((item:any) => (
                    <b key={item.name}>
                      {item.name}
                &nbsp;
                    </b>
                  ))}
                </div>
              </div>
            </div>
            <div className="character-sheet-action-row-2">
              <div className="character-sheet-armor-initiative-speed">
                <div className="character-sheet-armor">
                  {character.armorClass.value}
                  <br />
                  Armor Class
                </div>
                <div className="character-sheet-initiative">
                  <EditableDisplayComponent
                    action={(val:number) => { setCharacter((prevVal:any) => ({ ...prevVal, initiative: val })); }}
                    initialVal={character.initiative}
                    inputType="number"
                  />
                  Initiative
                </div>
                <div className="character-sheet-speed">
                  {character.speed.walk}
                  <br />
                  Speed
                </div>
              </div>
              <div className="character-sheet-hit-points">
                Hit Points
                <div className="character-sheet-current-hit-points">
                  <p>
                    Max:
                    {character.hitPoints.max}
                  </p>
                  <div>
                    Current:
                    <EditableDisplayComponent
                      action={(val:number) => {
                        setCharacter((prevVal:any) => (
                          { ...prevVal, hitPoints: { ...prevVal.hitPoints, current: val } }));
                      }}
                      initialVal={character.hitPoints.current}
                      inputType="number"
                    />
                  </div>
                </div>
                <div className="character-sheet-temporary-hit-points">
                  Temporary:
                  <EditableDisplayComponent
                    action={(val:any) => {
                      setCharacter((prevVal:any) => (
                        { ...prevVal, hitPoints: { ...prevVal.hitPoints, temporary: val } }));
                    }}
                    initialVal={character.hitPoints.temporary}
                    inputType="number"
                  />
                </div>
              </div>
              <div className="character-sheet-hit-death">
                <div className="character-sheet-hit-dice">
                  <span>
                    d
                    {character.classes.hitDie}
                  </span>
                  <br />
                  Hit Dice
                </div>
                <div className="character-sheet-death-save">
                  Death Save
                  <CharacterSheetDeathSaves
                    death={updateDeathSaves}
                    success={success}
                    fail={fails}
                  />
                </div>
              </div>
              <div className="character-sheet-attacks-spell-casting">
                Attacks & Spell Casting
              </div>
              <div className="character-sheet-equipment">
                <div className="character-sheet-currency">
                  {/* <div className="character-sheet-coin">
                CP:
                <EditableDisplayComponent action={null} initialVal={10} inputType="number" />
              </div>
              <div className="character-sheet-coin">
                SP:
                <EditableDisplayComponent action={null} initialVal={7} inputType="number" />
              </div>
              <div className="character-sheet-coin">
                EP:
                <EditableDisplayComponent action={null} initialVal={8} inputType="number" />
              </div>
              <div className="character-sheet-coin">
                GP:
                <EditableDisplayComponent action={null} initialVal={7} inputType="number" />
              </div>
              <div className="character-sheet-coin">
                PP:
                <EditableDisplayComponent action={null} initialVal={0} inputType="number" />
              </div> */}
                </div>
                <div className="character-sheet-equipment-list">
                  Equipments
                  <br />
                  {character.equipments.map((item:any) => (
                    <b key={item.equipment.name}>
                      {item.equipment.name}
                &nbsp;
                      {item.quantity}

                      <br />
                    </b>
                  ))}
                </div>
              </div>
            </div>
            <div className="character-sheet-action-row-3">
              <div className="character-sheet-personality">
                <div className="character-sheet-personality-traits">
                  Personality
                  {character.details.personality}
                  {/* <EditableDisplayComponent action={null}
              initialVal={character.details.personality} inputType="textarea" /> */}
                </div>
                <div className="character-sheet-personality-ideals">
                  Ideals
                  {character.details.ideal}
                  {/* <EditableDisplayComponent action={null}
               initialVal={character.details.ideal} inputType="textarea" /> */}
                </div>
                <div className="character-sheet-personality-bonds">
                  Bonds
                  {character.details.bond}
                  {/* <EditableDisplayComponent action={null}
              initialVal={character.details.bond} inputType="textarea" /> */}
                </div>
                <div className="character-sheet-personality-flaws">
                  Flaws
                  {character.details.flaw}
                  {/* <EditableDisplayComponent action={null}
              initialVal={character.details.flaw} inputType="textarea" /> */}
                </div>
              </div>
              <div className="character-sheet-personality-features-traits">
                Features & traits
                <br />
                <CharacterSheetFeatures features={character.classes.features} />

              </div>
            </div>
            <div />
          </div>
          <div className="character-sheet-save bg-gray-400">
            <ButtonForSaveOrUpdate
              username="David"
              body={character}
              set={setCharacter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
