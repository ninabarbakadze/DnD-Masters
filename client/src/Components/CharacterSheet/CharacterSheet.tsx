// import React from 'react';
import CharacterSheetAbilityInfo from './CharacterSheetAbilityInfo';
import {
  mockAbilities,
  mockProficientAbilities,
  mockProficientLanguages,
  mockProficientSkills,
} from '../../mockData/mockCharacter';
import EditableDisplayComponent from '../EditableDisplayComponent/EditableDisplayComponent';
import CharacterSheetProficiency from './CharacterSheetProficiency';
import './CharacterSheet.scss';

export default function CharacterSheet() {
  return (
    <div className="character-sheet">
      <div className="character-sheet-header">
        <div className="character-sheet-avatar-container">
          <img src="" alt="character avatar" />
          <h3>Character Name</h3>
        </div>
        <div>

          <div className="character-sheet-initial-information">
            <h3 className="character-sheet-username">User Name</h3>
            <h2 className="character-sheet-campaign">Campaign Name</h2>
          </div>
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
      </div>
      <div className="character-sheet-action">
        <div className="character-sheet-action-row-1">
          <div className="character-sheet-ability-proficiency">
            <div className="character-sheet-ability">
              {mockAbilities.map((ability) => (
                <CharacterSheetAbilityInfo
                  dispatchAction={null}
                  ability={ability.abilityScore.name}
                  score={ability.abilityScore.value}
                  modifier={ability.bonus}
                  inputType="number"
                />
              ))}
            </div>
            <div className="character-sheet-proficiency">
              <div className="character-sheet-inspiration">
                <EditableDisplayComponent action={null} initialVal={1} inputType="number" />
                <h4> INSPIRATION</h4>
              </div>
              <div className="character-sheet-proficiency-bonus">
                <div className="character-sheet-PB">
                  <h4> +2 PROFICIENCY BONUS</h4>
                </div>
              </div>
              <div className="character-sheet-saving-throws">
                <h4>SAVING THROWS :</h4>
                {mockProficientAbilities.attribute.map((attribute) => (
                  <CharacterSheetProficiency
                    name={attribute.name}
                    modifier={attribute.value}
                    action={null}
                  />
                ))}
              </div>
              <div className="character-sheet-skills">
                <h4>  SKILLS:</h4>
                {mockProficientSkills.attribute.map((attribute) => (
                  <CharacterSheetProficiency
                    name={attribute.name}
                    modifier={attribute.value}
                    action={null}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="character-sheet-perception">
              <h5>
                {15}
                {' '}
                Passive Wisdom (perception)
              </h5>
            </div>
            <div className="character-sheet-languages">
              <h5> Other Proficiencies & languages</h5>
              {mockProficientLanguages.attribute.map((attribute) => (
                <CharacterSheetProficiency
                  name={attribute.name}
                  action={null}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="character-sheet-action-row-2">
          <div className="character-sheet-armor-initiative-speed">
            <div className="character-sheet-armor">
              <EditableDisplayComponent action={null} initialVal={14} inputType="number" />
              Armor Class
            </div>
            <div className="character-sheet-initiative">
              <EditableDisplayComponent action={null} initialVal={11} inputType="number" />
              Initiative
            </div>
            <div className="character-sheet-speed">
              <EditableDisplayComponent action={null} initialVal={30} inputType="number" />
              Speed
            </div>
          </div>
          <div className="character-sheet-hit-points">
            Hit Points
            <div className="character-sheet-current-hit-points">
              Max: 12
              <br />
              Current:
              <EditableDisplayComponent action={null} initialVal={8} inputType="number" />
            </div>
            <div className="character-sheet-temporary-hit-points">
              Temporary:
              <EditableDisplayComponent action={null} initialVal={10} inputType="number" />
            </div>
          </div>
          <div className="character-sheet-hit-death">
            <div className="character-sheet-hit-dice">
              Hit Dice
            </div>
            <div className="character-sheet-death-save">
              Death Save
            </div>
          </div>
          <div className="character-sheet-attacks-spell-casting">
            Attacks & Spell Casting
          </div>
          <div className="character-sheet-equipment">
            <div className="character-sheet-currency">
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
            </div>
            <div className="character-sheet-equipment-list">Equipments</div>
          </div>
        </div>
        <div className="character-sheet-action-row-3">
          <div className="character-sheet-personality">
            <div className="character-sheet-personality-traits">
              Personality Traits
              <EditableDisplayComponent action={null} initialVal="Im Great" inputType="textarea" />
            </div>
            <div className="character-sheet-personality-ideals">
              Ideals
              <EditableDisplayComponent action={null} initialVal="Im Great" inputType="textarea" />
            </div>
            <div className="character-sheet-personality-bonds">
              Bonds
              <EditableDisplayComponent action={null} initialVal="Im Great" inputType="textarea" />
            </div>
            <div className="character-sheet-personality-flaws">
              Flaws
              <EditableDisplayComponent action={null} initialVal="Im Great" inputType="textarea" />
            </div>
          </div>
          <div className="character-sheet-personality-features-traits">Features & traits</div>
        </div>
      </div>
    </div>
  );
}
