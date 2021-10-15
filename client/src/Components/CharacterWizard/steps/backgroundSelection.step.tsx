/* eslint-disable */
import { useEffect, useState } from 'react';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterBackground, iCharacterChoice } from '../../../interfaces/externalData.interfaces';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import Options from '../helpers/selectOptions.helper';
import { updateBackground } from '../../../actions/characterCreationWizard.actions';
import CharacterChoice from '../../CharacterChoice/characterChoice';

const loading = [<option key={0}>...Loading</option>]

const BackgroundSelectionStep = ({ path, onSubmit }:iWizardStepProps<iCharacter>) => {
  const [backgrounds, setBackgrounds] = useState<iCharacterBackground[]>([]);
  const [selectedBackground,setSelectedBackground] = useState<iCharacterBackground>()
  const [PersonalityTraits, setPersonalityTraits] = useState<any[]>([])
  const [ideals, setIdeals] = useState<any[]>([])
  const [bonds, setBonds] = useState<any[]>([])
  const [flaws, setFlaws] = useState<any[]>([])
  const [backgroundsList,setBackgroundsList] = useState<JSX.Element[]>(loading);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllBackgroundOptions = () => {
    getAllInList<iCharacterBackground>('backgrounds').then((results) => {

      setBackgrounds(results);
      setBackgroundsList(Options(results));
      setSelectedBackground(results[0])

      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllBackgroundOptions();
  }, []);
  

  return (
    <div>
      <h2>Select Character Background </h2>
      <form
        onSubmit={((e) => {
          e.preventDefault()
        })}
      >
        <label htmlFor='background'>Background</label>
        <select
          id="person"
          name="background"
          disabled={isLoading}
          onChange={ e=> setSelectedBackground(
            backgrounds.filter((item)=> item.name == e.target.value)[0]
          )}
        >
          {backgroundsList}
        </select>
        {selectedBackground &&   (
          <>
            <h3>Personality traits</h3>
            <CharacterChoice
              choices={selectedBackground.personality_traits} 
              selected={PersonalityTraits}
              setSelected={setPersonalityTraits}  
            />
            <h3>Ideal</h3>
            <CharacterChoice 
              choices={selectedBackground.ideals}
              selected={ideals}
              setSelected={setIdeals}    
            />
            <h3>Bond</h3>
            <CharacterChoice 
              choices={selectedBackground.bonds}
              selected={bonds}
              setSelected={setBonds}    
            />
            <h3>Flaw</h3>
            <CharacterChoice 
              choices={selectedBackground.flaws}
              selected={flaws}
              setSelected={setFlaws}    
            />
          </>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default BackgroundSelectionStep;