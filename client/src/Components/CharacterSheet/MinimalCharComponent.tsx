/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './CharacterSheet.scss';
import CharacterSheet from './CharacterSheet';
import photos from '../../assets/racePhotos/racePhotos';
import CharacterSheetSkills from './CharacterSheetSkills';
import mockCharacter from '../../mockData/mockCharackter';
import CharacterSheetAbilityInfo from './CharacterSheetAbilityInfo';
import CharacterSheetSavingThrows from './CharacterSheetSavingThrows';
import { mod, proficiencyBonusCalc, positivePrecursor } from './helper';

export default function MinimalCharComponent() {
  const [character, setCharacter] = useState({ ...mockCharacter });
  const [abilityShow, setAbilityShow] = useState(false);
  const [proficientShow, setProficientShow] = useState(false);
  const [languagesShow, setLanguagesShow] = useState(false);
  const [nameShow, setNameShow] = useState(false);
  const [initiativeShow, setInitiativeShow] = useState(false);
  const [charSheetShow, setCharSheetShow] = useState(false);

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
  };
  const modifyPassiveWisdom = (perception:number) => {
    // setCharacter((preVal:any) => ({ ...preVal, passiveWisdom: perception }));
    console.log('passWis', perception + character.passiveWisdom);
  };
  return (
    <div className="menu">
      <div className="flex flex-row  header " style={{ width: '150vh' }}>
        <img
          className="img-avatar"
          // @ts-ignore
          src={photos[character.race.index.replace('-', '')]}
          alt={character.race.index}
        />
        <div className="flex-initial-1 head-menu" onClick={() => setNameShow(!nameShow)}>
          {character.characterName}
          {nameShow ? (
            <div className="char">
              {/* <CharacterSheet fetched={character} /> */}
              <div>
                Race: &nbsp;
                {character.race.name}
              </div>
              <div>
                Class: &nbsp;
                {character.classes.name}
              </div>
              <div>
                background: &nbsp;
                {character.background.name}
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex-initial-1 head-menu" onClick={() => setAbilityShow(!abilityShow)}>
          <div className="minimal-ability ">
            Ability Scores
          </div>
          <div className="minimal-ability-list flex" />
          {abilityShow ? character.abilityScores.map((ability:any) => (
            <CharacterSheetAbilityInfo
              key={ability.name}
              dispatchAction={updateCharacterAbility}
              ability={ability.name}
              score={ability.scores}
              modifier={mod(ability.scores)}
              inputType="number"
            />
          )) : null}
        </div>
        <div className="flex-initial-1 head-menu" onClick={() => setProficientShow(!proficientShow)}>
          <div>
            Proficiency Bonus:
                    &nbsp;
            {positivePrecursor(proficiencyBonusCalc(character.classes.level))}
          </div>
          <div>
            {
            proficientShow
              ? (
                <div>
                  <div>
                    <CharacterSheetSavingThrows
                      ability={character.abilityScores}
                      bonus={proficiencyBonusCalc(character.classes.level)}
                    />
                  </div>
                  <CharacterSheetSkills
                    skills={character.skills}
                    ability={character.abilityScores}
                    bonus={proficiencyBonusCalc(character.classes.level)}
                    pasWisdom={modifyPassiveWisdom}
                  />
                </div>
              )
              : null
}
          </div>
        </div>
        <div className="flex-initial-1 head-menu" onClick={() => setLanguagesShow(!languagesShow)}>
          <div>languages</div>
          {console.log(character.languages)}
          {languagesShow ? character.languages.map((attribute:any) => (
            <div key={attribute.name}>
              {attribute.name}
            </div>
          )) : null}
        </div>
        <div className="flex-initial-1 head-menu" onClick={() => setInitiativeShow(!initiativeShow)}>
          <div className="minimal-ability ">
            Initiative: &nbsp;
            {character.initiative}
          </div>
        </div>
        <div className="flex-initial-1 head-menu">
          <div onClick={() => setCharSheetShow(!charSheetShow)}>Character Sheet</div>

        </div>
      </div>
      <div>
        {charSheetShow
          ? (
            <div className="sheet">
              <div onClick={() => setCharSheetShow(!charSheetShow)}>
                Hide
              </div>
              <CharacterSheet fetched={character} />

            </div>
          ) : null}
      </div>
    </div>
  );
}
