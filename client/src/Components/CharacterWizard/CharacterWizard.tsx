import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import RaceSelection from './steps/RaceSelection.step';
import { iCharacter } from '../../interfaces/character.interface';
import SubRaceSelection from './steps/subRaceSelection.step';
import { useWizardStepComplete } from '../../utilities/wizard.utilities';
import BackgroundSelectionStep from './steps/backgroundSelection.step';
import AttributeSelectionStep from './steps/attributeSelection/attributeSelection.step';
import CharacterSheet from '../CharacterSheet/CharacterSheet';

const CharacterWizard: FC = () => {
  const onWizardComplete = () => console.log('finished');

  const submitfunc = useWizardStepComplete<iCharacter>(onWizardComplete);

  return (
    <div>
      <h1>Character Wizard</h1>
      <Switch>
        <Route path="/characterWizard/raceSelection">
          <RaceSelection
            onSubmit={submitfunc}
            path="/characterWizard/backgroundSelection"
          />
          {/* <RaceSelection onSubmit={handle} path="/gameWizard/step2" /> */}
        </Route>
        <Route path="/characterWizard/subRaceSelection">
          <SubRaceSelection
            onSubmit={submitfunc}
            path="/characterWizard/backgroundSelection"
          />
        </Route>
        <Route path="/characterWizard/backgroundSelection">
          <BackgroundSelectionStep
            onSubmit={submitfunc}
            path="/characterWizard/attributeSelection"
          />
        </Route>
        <Route path="/characterWizard/attributeSelection">
          <AttributeSelectionStep
            onSubmit={submitfunc}
            path="/characterWizard/characterSheet"
          />
        </Route>
        <Route path="/characterWizard/characterSheet">
          <CharacterSheet />
        </Route>
      </Switch>
    </div>
  );
};

export default CharacterWizard;
