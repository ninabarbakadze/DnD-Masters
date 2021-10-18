/* eslint-disable */
import { useEffect, useState } from 'react';
import { iCharacter } from '../../../interfaces/character.interface';
import { iCharacterBackground } from '../../../interfaces/externalData/externalData.interface';
import { iWizardStepProps } from '../../../interfaces/wizard.interface';
import { getAllInList } from '../../../services/externalData.service';
import Options from '../helpers/selectOptions.helper';
import { updateBackground } from '../../../actions/characterCreationWizard.actions';
import CharacterChoice from '../../CharacterChoice/characterChoice';
import { chosenToStrings } from '../../../utilities/choice.utilities';

const loading = [<option key={0}>...Loading</option>];

const BackgroundSelectionStep = ({
  path,
  onSubmit,
}: iWizardStepProps<iCharacter>) => {
  const [backgrounds, setBackgrounds] = useState<iCharacterBackground[]>([]);
  const [selectedBackground, setSelectedBackground] =
    useState<iCharacterBackground>();
  const [personalityTraits, setPersonalityTraits] = useState<any[]>([]);
  const [ideals, setIdeals] = useState<any[]>([]);
  const [bonds, setBonds] = useState<any[]>([]);
  const [flaws, setFlaws] = useState<any[]>([]);
  const [backgroundsList, setBackgroundsList] =
    useState<JSX.Element[]>(loading);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllBackgroundOptions = () => {
    getAllInList<iCharacterBackground>('backgrounds').then((results) => {
      setBackgrounds(results);
      setBackgroundsList(Options(results));
      setSelectedBackground(results[0]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllBackgroundOptions();
  }, []);

  const prepareCreatedBackground = () => {
    if (selectedBackground) {
      const createdBackgroud = selectedBackground;
      createdBackgroud.chosen_personality_trait =
        chosenToStrings(personalityTraits);
      createdBackgroud.chosen_ideal = chosenToStrings(ideals);
      createdBackgroud.chosen_bond = chosenToStrings(bonds);
      createdBackgroud.chosen_flaw = chosenToStrings(flaws);
      return createdBackgroud;
    }
  };

  return (
    <div>
      <h2>Select Character Background </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const background = prepareCreatedBackground();
          console.log('this is it', background);
          onSubmit({ background }, updateBackground, path);
        }}
      >
        <label htmlFor="background">Background</label>
        <select
          id="person"
          name="background"
          disabled={isLoading}
          onChange={(e) =>
            setSelectedBackground(
              backgrounds.filter((item) => item.name == e.target.value)[0],
            )
          }
        >
          {backgroundsList}
        </select>
        {selectedBackground && (
          <>
            <h3>Personality traits</h3>
            <CharacterChoice
              choices={selectedBackground.personality_traits}
              selected={personalityTraits}
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
