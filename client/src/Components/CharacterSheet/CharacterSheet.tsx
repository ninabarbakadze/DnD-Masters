import { useSelector } from 'react-redux';

import { useState } from 'react';
import CharacterSheetAbilityInfo from './CharacterSheetAbilityInfo';
import mockCharacter from '../../mockData/mockPayerWithCharacter';
import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';
import './CharacterSheet.scss';
import { IRootState } from '../../reducers';

import {
  mod,
  proficiencyBonusCalc,
  positivePrecursor,
} from './helper';
import CharacterSheetSavingThrows from './CharacterSheetSavingThrows';
import CharacterSheetSkills from './CharacterSheetSkills';
import CharacterSheetDeathSaves from './CharacterSheetDeathSaves';
import CharacterSheetFeatures from './CharacterSheetFeatures';
import CharacterSheetNotes from './CharacterSheetNotes';

export default function CharacterSheet() {
  const [character] = useState({ ...mockCharacter });
  const [abilityScr, setAbilityScr] = useState([...mockCharacter.abilityScores]);
  const [passiveWisdom, setPassiveWisdom] = useState(10);
  const [initiative, setInitiative] = useState(10);
  const [currentHitPoints, setCurrentHitPoints] = useState(character.hitPoints.current);
  const [temporaryHitPoints, setTemporaryHitPoints] = useState(10);
  const [success, setSuccess] = useState<number>(3);
  const [fails, setFails] = useState<number>(3);
  const [note, setNote] = useState<string>('Notes goes here...');
  const newcharacter = useSelector((state:IRootState) => state.characterCreationReducer);
  const modifyPassiveWisdom = (perception:number) => {
    setPassiveWisdom(10 + perception);
  };
  const updateCharacterAbility = (updateValue: number, attributeName:string) => {
    const updateAbilityScrList = abilityScr.map((item) => {
      if (item.name === attributeName) {
        const updateAbility = {
          ...item,
          scores: updateValue,
        };
        return updateAbility;
      }
      return item;
    });
    setAbilityScr(updateAbilityScrList);
  };
  const updateDeathSaves = (result:string) => {
    // eslint-disable-next-line no-unused-expressions
    (result === 'success' && success > 0 && setSuccess((succes:number) => succes - 1))
    || (result === 'fails' && fails > 0 && setFails((fail:number) => fail - 1));
  };
  const updateMyNotes = (myNote:string) => {
    setNote(myNote);
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
              <span>{character.player.name}</span>
            </h5>
            <h4 className="character-sheet-campaign">Campaign Name</h4>
          </div>
          <div className="character-sheet-background-info">
            <div className="character-sheet-CLB">
              <div>
                Class
                <br />
                <span>{character.classes[0].name}</span>
              </div>
              <div>
                Level
                <br />
                <span>{character.classes[0].level}</span>
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
              {abilityScr.map((ability:any) => (
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
                  {positivePrecursor(passiveWisdom)}
                  &nbsp;
                  Passive Wisdom (perception)
                </h5>
              </div>
              <div className="character-sheet-proficiency-bonus">
                <div className="character-sheet-PB">
                  <h4>
                    {positivePrecursor(proficiencyBonusCalc(character.classes[0].level))}
                    &nbsp;
                    PROFICIENCY BONUS
                  </h4>
                </div>
              </div>
              <div className="character-sheet-saving-throws">
                <h4>SAVING THROWS :</h4>
                <CharacterSheetSavingThrows
                  ability={abilityScr}
                  bonus={proficiencyBonusCalc(character.classes[0].level)}
                />
              </div>
              <div className="character-sheet-skills">
                <h4>  SKILLS:</h4>
                <CharacterSheetSkills
                  skills={character.skills}
                  ability={abilityScr}
                  bonus={proficiencyBonusCalc(character.classes[0].level)}
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
                <b key={attribute}>
                  {attribute}
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
                action={setInitiative}
                initialVal={initiative}
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
                  action={setCurrentHitPoints}
                  initialVal={currentHitPoints}
                  inputType="number"
                />
              </div>
            </div>
            <div className="character-sheet-temporary-hit-points">
              Temporary:
              <EditableDisplayComponent
                action={setTemporaryHitPoints}
                initialVal={temporaryHitPoints}
                inputType="number"
              />
            </div>
          </div>
          <div className="character-sheet-hit-death">
            <div className="character-sheet-hit-dice">
              <span>
                d
                {character.classes[0].hitDie}
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
            <CharacterSheetFeatures features={character.classes[0].features} />

          </div>
        </div>
        <div>
          <h6>notes</h6>
          <CharacterSheetNotes note={note} updateNote={updateMyNotes} />
        </div>
      </div>
    </div>
  );
}
