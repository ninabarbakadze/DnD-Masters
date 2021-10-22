/* eslint-disable no-unused-vars */
import './CharacterSheet.scss';
import { useEffect, useState } from 'react';
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
import {
  mod, proficiencyBonusCalc, positivePrecursor, updateArrObj,
} from './helper';
import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';
// import { saveCharacter } from '../../services/character.sevices';
import ButtonForSaveOrUpdate from './ButtonForSaveOrUpdate';
import CharacterSheetAttacks from './CharacterSheetAttacks';
import { ICharacterDB } from '../../interfaces/characterFromDB.intervace';

interface IProps{
  fetched:ICharacterDB |undefined
}
export default function CharacterSheet({ fetched }:IProps) {
  const username = useSelector((state:IRootState) => state.user.name);
  const newCharacter = useSelector((state:IRootState) => state.characterCreationReducer);
  const formatted = fetched || formatCharacter(newCharacter);

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

  useEffect(() => {
    setCharacter((prevVal:any) => ({ ...prevVal, name: username }));
  }, []);
  // console.log( newCharacter);
  console.log('character: ', character);
  return (
    <div className="character-sheet-background ">
      <div className="character-sheet bg-gray-300">
        <div className="character-sheet-header bg-gray-400">
          <div className="character-sheet-avatar-container" />
          <div className="character-sheet-initial-information">
            <h5 className="character-sheet-username">
              Hello
              &nbsp;
              <em><b>{username || 'user name'}</b></em>
            </h5>
            <div className="character-name">
              {/* <b>Character Name</b> */}
              <EditableDisplayComponent
                inputType="input"
                action={(val:string) => { setCharacter((prevVal:any) => ({ ...prevVal, characterName: val })); }}
                initialVal="Name your Char!"
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
                  <div className="character-sheet-inspiration ">
                    <EditableDisplayComponent
                      action={(val:string) => { setCharacter((prevVal:any) => ({ ...prevVal, inspiration: val })); }}
                      initialVal={0}
                      inputType="number"
                    />
                    &nbsp;
                    <h4> INSPIRATION</h4>
                  </div>
                  <div className="character-sheet-perception">
                    {/* <h5> */}
                    <div className="character-sheet-ability-mod">{positivePrecursor(character.passiveWisdom)}</div>
                    &nbsp;
                    Perception
                    {/* </h5> */}
                  </div>
                  <div className="character-sheet-proficiency-bonus">
                    <div className="character-sheet-PB">
                      <div className="character-sheet-ability-mod">
                        {positivePrecursor(proficiencyBonusCalc(character.classes.level))}

                      </div>
                      <h4>
                        &nbsp;
                        BONUS
                      </h4>
                    </div>
                  </div>
                  <div className="character-sheet-saving-throws">
                    <h4>SAVING THROWS :</h4>
                    <br />
                    <CharacterSheetSavingThrows
                      ability={character.abilityScores}
                      bonus={proficiencyBonusCalc(character.classes.level)}
                    />
                  </div>
                  <div className="character-sheet-skills">
                    <h4>  SKILLS:</h4>
                    <br />
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
                  <div className="subTitle"> Other Proficiencies & languages</div>
                  <div>

                    <b>Languages: </b>
                  &nbsp;
                    {character.languages.map((attribute:any) => (
                      <em>
                        <b key={attribute.name}>
                          {attribute.name}
                          ,
                          &nbsp;
                        </b>

                      </em>
                    ))}
                  </div>
                  <div>
                    <b>Other: </b>
                  &nbsp;
                    {character.proficiencies.map((item:any) => (
                      <em>

                        <b key={item.name}>
                          {item.name}
                          ,
                          &nbsp;
                        </b>

                      </em>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="character-sheet-action-row-2">
              <div className="character-sheet-armor-initiative-speed">
                <div className="character-sheet-armor">
                  <div className="bright-frame">
                    {character.armorClass.value}
                  </div>
                  <div className="hit-point "> Armor</div>
                </div>
                <div className="character-sheet-initiative">
                  <EditableDisplayComponent
                    action={(val:number) => { setCharacter((prevVal:any) => ({ ...prevVal, initiative: val })); }}
                    initialVal={character.initiative}
                    inputType="number"
                  />
                  <div className="hit-point">Initiative</div>
                </div>
                <div className="character-sheet-speed">
                  <div className="bright-frame">{character.speed.walk}</div>

                  <div className="hit-point"> Speed</div>
                </div>
              </div>
              <div className="character-sheet-hit-points">
                <div className="hit-point"> Hit Points</div>
                <div className="character-sheet-max-curr-temp-hit-points">
                  <div className="character-sheet-max-hit-points">
                    Max:
                    <br />
                    <div className="bright-frame">{character.hitPoints.max}</div>
                  </div>
                  <div className="character-sheet-current-hit-points">
                    <div>
                      Current:
                      <EditableDisplayComponent
                        action={
                          (val:number) => {
                            setCharacter((prevVal:any) => (
                              { ...prevVal, hitPoints: { ...prevVal.hitPoints, current: val } }));
                          }
}
                        initialVal={character.hitPoints.max}
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
              </div>
              <div className="character-sheet-hit-death">
                <div className="character-sheet-hit-dice">
                  <div className="hit-point"> Hit Dice </div>
                  <div className="bright-frame">
                    <span>
                      d
                      {character.classes.hitDie}
                    </span>
                  </div>
                </div>
                <div className="character-sheet-death-save">
                  <div className="hit-point">Death Save</div>
                  <CharacterSheetDeathSaves
                    death={updateDeathSaves}
                    success={success}
                    fail={fails}
                  />
                </div>
              </div>
              <div className="character-sheet-attacks-spell-casting">
                <div className="hit-point"> Attacks & Spell Casting</div>
                <CharacterSheetAttacks weapons={character.weapons} />
              </div>
              <div className="character-sheet-equipment">
                {/* <div className="character-sheet-currency">
                  <div className="character-sheet-coin">
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
              </div>
                </div> */}
                <div className="character-sheet-equipment-list">
                  <div className="hit-point ">Equipments</div>
                  <br />
                  {console.log('character at equip', character)}
                  {character.equipments.map((item:any) => (
                    <div className="equipment-list-item" key={item.equipment.name}>
                      {item.equipment.name}

                      <div>x</div>

                      <EditableDisplayComponent
                        inputType="number"
                        itemKey={item.equipment.name}
                        action={(val:number, key:string) => setCharacter(updateArrObj(character, key, Number(val)))}
                        initialVal={item.quantity}
                      />

                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="character-sheet-action-row-3">
              <div className="character-sheet-personality">
                <div className="character-sheet-personality-traits">
                  <div className="hit-point">Personality</div>
                  {character.details.personality}
                  {/* <EditableDisplayComponent action={null}
              initialVal={character.details.personality} inputType="textarea" /> */}
                </div>
                <div className="character-sheet-personality-ideals">
                  <div className="hit-point">Ideals</div>
                  {character.details.ideal}
                  {/* <EditableDisplayComponent action={null}
               initialVal={character.details.ideal} inputType="textarea" /> */}
                </div>
                <div className="character-sheet-personality-bonds">
                  <div className="hit-point">Bonds</div>
                  {character.details.bond}
                  {/* <EditableDisplayComponent action={null}
              initialVal={character.details.bond} inputType="textarea" /> */}
                </div>
                <div className="character-sheet-personality-flaws">
                  <div className="hit-point"> Flaws</div>
                  {character.details.flaw}
                  {/* <EditableDisplayComponent action={null}
              initialVal={character.details.flaw} inputType="textarea" /> */}
                </div>
                <div className="character-sheet-personality-features-traits">
                  <div className="hit-point">Features & traits</div>
                  <br />
                  <CharacterSheetFeatures features={character.classes.features} />

                </div>
              </div>
            </div>
            <div />
          </div>
          <div className="character-sheet-save bg-gray-400">
            <ButtonForSaveOrUpdate
              username={username}
              body={character}
              set={setCharacter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
