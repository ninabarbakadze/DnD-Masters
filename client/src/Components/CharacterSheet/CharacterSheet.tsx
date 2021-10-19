/* eslint-disable no-unused-vars */
import './CharacterSheet.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import CharacterSheetNotes from './CharacterSheetNotes';
import mockCharacter from '../../mockData/mockCharackter';
import CharacterSheetSkills from './CharacterSheetSkills';
import CharacterSheetFeatures from './CharacterSheetFeatures';
import CharacterSheetDeathSaves from './CharacterSheetDeathSaves';
import formatCharacter from '../../mockData/mockPayerWithCharacter';
import CharacterSheetAbilityInfo from './CharacterSheetAbilityInfo';
import CharacterSheetSavingThrows from './CharacterSheetSavingThrows';
import { mod, proficiencyBonusCalc, positivePrecursor } from './helper';
import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';

export default function CharacterSheet() {
  const newcharacter = useSelector((state:IRootState) => state.characterCreationReducer);

  const formated = formatCharacter(newcharacter);
  const [character, setCharacter] = useState({ ...formated });
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
  console.log('formated', formated);

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

  console.log(newcharacter);
  return (
    <div className="character-sheet">
      <div className="character-sheet-header">
        <div className="character-sheet-avatar-container">
          <img src="" alt="character avatar" />
          <h3>Character Name</h3>
        </div>
        <div>
          <div className="character-sheet-initial-information">
            <h5 className="character-sheet-username">
              User Name
              <span>{character.name}</span>
            </h5>
            <h4 className="character-sheet-campaign">Campaign Name</h4>
          </div>
          <div className="character-sheet-background-info">
            <div className="character-sheet-CLB">
              <div>
                Class
                <br />
                <span>{character.classes.name}</span>
              </div>
              <div>
                Level
                <br />
                <span>{character.classes.level}</span>
              </div>
              <div>
                Background
                <br />
                <span>{character.background.name}</span>
              </div>
            </div>
            <div className="character-sheet-RAX">
              <div>
                Race
                <br />
                <span>{character.race.name}</span>
              </div>
              <div>
                Alignment
                <br />
                <span>{character.alignment}</span>
              </div>
              <div>
                XP
                <br />
                <span>{character.xp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                <EditableDisplayComponent action={null} initialVal={0} inputType="number" />
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
                    setCharacter((prevVal:any) => ({ ...prevVal, hitPoints: { ...prevVal.hitPoints, current: val } }));
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
                  setCharacter((prevVal:any) => ({ ...prevVal, hitPoints: { ...prevVal.hitPoints, temporary: val } }));
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
              <EditableDisplayComponent action={null} initialVal={character.details.personality} inputType="textarea" />
            </div>
            <div className="character-sheet-personality-ideals">
              Ideals

              <EditableDisplayComponent action={null} initialVal={character.details.ideal} inputType="textarea" />
            </div>
            <div className="character-sheet-personality-bonds">
              Bonds
              <EditableDisplayComponent action={null} initialVal={character.details.bond} inputType="textarea" />
            </div>
            <div className="character-sheet-personality-flaws">
              Flaws
              <EditableDisplayComponent action={null} initialVal={character.details.flaw} inputType="textarea" />
            </div>
          </div>
          <div className="character-sheet-personality-features-traits">
            Features & traits
            <br />
            <CharacterSheetFeatures features={character.classes.features} />

          </div>
        </div>
        <div>
          <h6>notes</h6>
          <CharacterSheetNotes
            note={character.note}
            updateNote={(note:string) => { setCharacter((prevVal:any) => ({ ...prevVal, note })); }}
          />
        </div>
      </div>
    </div>
  );
}
