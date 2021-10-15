// import React from 'react';
import CharacterSheetAbilityInfo from './CharacterSheetAbilityInfo';
import mockAbilities from '../../mockData/mockCharacter';
import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';
import CharacterSheetProficiency from './CharacterSheetProficiency';

export default function CharacterSheet() {
  return (
    <div className="character-sheet">
      <div className="character-sheet-header">
        <div className="character-sheet-avatar-container">
          <img src="" alt="character avatar" />
          <h3>Character Name</h3>
        </div>
      </div>
      <div>
        <div className="character-sheet-initial-information">
          <h3 className="character-sheet-username">User Name</h3>
          <h2 className="character-sheet-campaign">Campaign Name</h2>
          <div className="character-sheet-background-info">
            <div className="character-sheet-CLB">
              <div>Class</div>
              <div>Level 1</div>
              <div>Background</div>
            </div>
            <div className="character-sheet-RAX">
              <div>Race</div>
              <div>Alignment</div>
              <div>XP</div>
            </div>
          </div>
        </div>
        <div className="character-sheet-ability">
          {mockAbilities.map((ability) => (
            <CharacterSheetAbilityInfo
              dispatchAction={null}
              ability={ability.abilityScore.name}
              score={16}
              modifier={ability.bonus}
              inputType="number"
            />
          ))}
        </div>
        <div className="character-sheet-proficiency">
          <div className="character-sheet-inspiration">
            <EditableDisplayComponent action={null} initialVal={1} inputType="number" />
            INSPIRATION
          </div>
          <div className="character-sheet-proficiency-bonus">
            <div className="character-sheet-PB">+2</div>
            PROFICIENCY BONUS
          </div>
          <div className="character-sheet-saving-throws">
            SAVING THROWS :
            <CharacterSheetProficiency name="std" modifier={2} action={null} />
          </div>
          <div className="character-sheet-skills">
            skills
          </div>
        </div>

      </div>
    </div>
  );
}
